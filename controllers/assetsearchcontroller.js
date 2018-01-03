/**
 * Controller for asset search
 */
var con = require('./databasecontroller');
var app = require('../app');
var json = require('json');
var exp = require('express');
var async = require('async');
var formidable = require('formidable');
var fs = require('fs');
var Asset = require('../models/asset');
var Reference = require('../models/reference');
var Period = require('../models/period');
var StatueType = require('../models/statueType');
var ArchitecturalElementType = require('../models/architecturalElementType');
var Culture = require('../models/culture');
var Material = require('../models/material');
var Style = require('../models/style');
var ShaderType = require('../models/shaderType');
var DiagramType = require('../models/diagramType');
var Publication = require('../models/publication');
var Project = require('../models/project');
var uniqid = require('uniqid');
var ObjectID = require("bson-objectid");
var path = require('path');


//get method for asset search
exports.search_get =  (req, res, next) => {
    async.parallel({
        reference_list: callback => {
            Reference.find().exec(callback);
        },
        period_list: callback => {
            Period.find().exec(callback);
        },
        statue_type_list: callback => {
            StatueType.find().exec(callback);
        },
        culture_list: callback => {
            Culture.find().exec(callback);
        },
        material_list: callback => {
            Material.find().exec(callback);
        },
        architectural_type_list: callback => {
            ArchitecturalElementType.find().exec(callback);
        },
        style_list: callback => {
            Style.find().exec(callback);
        },
        shader_type_list: callback => {
            ShaderType.find().exec(callback);
        },
        diagram_type_list: callback => {
            DiagramType.find().exec(callback);
        },
        publication_list: callback => {
            Publication.find().exec(callback);
        }

    }, (err, result) => {
        if(err) {return next(err);  }
        //successful

        res.render('assetSearch',
            {title: 'Search for Asset',
                reference_list:result.reference_list,
                shader_type_list:result.shader_type_list,
                period_list:result.period_list,
                diagram_type_list:result.diagram_type_list,
                publication_list:result.publication_list,
                prop_name_list:[], //to be added
                statue_type_list:result.statue_type_list,
                culture_list:result.culture_list,
                material_list:result.material_list,
                architectural_type_list:result.architectural_type_list,
                style_list:result.style_list,
            });
    });
};





// Handle Asset search on POST
exports.search_post =  (req, res, next) => {

    // //Check that the id field is not empty
    // //req.checkBody('name', 'ID required').notEmpty();
    //
    // //Trim and escape the name field.
    // req.sanitize('name').escape();
    // req.sanitize('name').trim();
    //
    // //Run the validators
    // var errors = req.validationErrors();
    //
    //
    //
    // if (errors) {
    //     //If there are errors render the form again, passing the previously entered values and errors
    //     res.render('searchForm', { title: 'Search Asset', id:req.body.id, errors: errors});
    //     return;
    // }
    // else {
    //     //if there are no errors search the database and return the result, render the asset list page
    //     Asset.find( {name: ({$regex:req.body.name})} )
    //         .exec( (err, list_asset) => {
    //             if (err)  {return next(err);}
    //             if(list_asset.length == 0) {
    //                                  res.render('success', {title: 'empty', massage: 'empty!'});
    //                              }
    //                              else {
    //                                  console.log(list_asset);
    //                                  res.render('assetList', { list_asset : list_asset})
    //                              }
    //         })
    //  }
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        async.parallel({
            projectId : callback => {
                Project.findOne({'name': fields.project_name}).exec(callback);
            }
        },(err,results) => {
            if(err) {next(err);}

            //get the asset template
            var assetTemplate = getNewAssetTemplate(fields);

            if(results.projectId != null){
                assetTemplate.project = results.projectId;
            }
            console.log("Search for assets : ");
            console.log(fields);
            console.log( assetTemplate);

            //find all satisfying assets, sort by asset name
            Asset.find( {$query: assetTemplate, $orderby:{'name': 1}} ).exec( (err, list_asset) => {
                if (err)  {return next(err);}
                if(list_asset.length == 0) {
                     res.render('success', {title: 'empty', massage: 'empty!'});
                 }
                 else {
                     console.log(list_asset);
                     res.render('assetList', { list_asset : list_asset})
                 }
            })
        })
    });
};


var getNewAssetTemplate = fields => {
    var assetTemplate = createNewAsset(fields);
    switch(fields.asset_type){
        case 'Asset':
            break;
        case 'Shader':
            if(fields.shader_type_name != '-1') {
                assetTemplate.shaderType = fields.shader_type_name;
            }
            break;
        case 'Diagram':
            if(fields.diagram_type_name != '-1') {
                assetTemplate.diagramType = fields.diagram_type_name;
            }
            if(fields.publication_name != '-1') {
                assetTemplate.originalPublication = fields.publication_name;
            }
            if(fields.site_name != '') {
                assetTemplate.site = fields.site_name;
            }
            break;
        case 'Statue':
            if(fields.statue_type_name != '-1'){
                assetTemplate.statueType = fields.statue_type_name;
            }
            if(fields.statue_culture_name != '-1') {
                assetTemplate.statueCulture = fields.statue_culture_name;
            }
            if(fields.material_name != '-1') {
                assetTemplate.material = fields.material_name;
            }
            if(fields.pose_name != ''){
                assetTemplate.pose = fields.pose_name;
            }
            if(fields.location_name != '') {
                assetTemplate.location = fields.location_name;
            }
            if(fields.gender != 'uncertain') {
                assetTemplate.gender = fields.gender;
            }
            break;
        case 'Architectural Element':
            if(fields.architectural_culture_name != '-1') {
                assetTemplate.architecturalCulture = fields.architectural_culture_name;
            }
            if(fields.architectural_type_name != '-1') {
                assetTemplate.architecturalElementType = fields.architectural_type_name;
            }
            if(fields.style_name != '-1') {
                assetTemplate.style = fields.style_name;
            }
            break;
        case 'Prop':
            break;
    }
    return assetTemplate;
};

//create a new asset template based on the request
var createNewAsset = fields => {
    var assetTemplate = {};

    if(fields.asset_name != '') {
        assetTemplate.name = fields.asset_name;
    }
    if(fields.asset_type != 'Asset') {
        assetTemplate.type = fields.asset_type;
    }
    if(fields.reference != '-1') {
        assetTemplate.reference = fields.reference;
    }
    if(fields.directory != '') {
        assetTemplate.fakeDirectory = fields.directory;
    }
    if(fields.period_name != '-1') {
        assetTemplate.period = fields.period_name;
    }

    return assetTemplate;
};
//