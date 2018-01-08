/**
 * Controller for asset search
 */
const con = require('./databasecontroller');
const app = require('../app');
const json = require('json');
const exp = require('express');
const async = require('async');
const formidable = require('formidable');
const fs = require('fs');
const Asset = require('../models/asset');
const Reference = require('../models/reference');
const Period = require('../models/period');
const StatueType = require('../models/statueType');
const ArchitecturalElementType = require('../models/architecturalElementType');
const Culture = require('../models/culture');
const Material = require('../models/material');
const Style = require('../models/style');
const ShaderType = require('../models/shaderType');
const DiagramType = require('../models/diagramType');
const Publication = require('../models/publication');
const Project = require('../models/project');
const uniqid = require('uniqid');
const ObjectID = require("bson-objectid");
const path = require('path');
const queryString = require('query-string');

//get method for asset search
exports.search_get = (req, res, next) => {
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
        if (err) {
            return next(err);
        }
        //successful

        res.render('assetSearch',
            {
                title: 'Search for Asset',
                reference_list: result.reference_list,
                shader_type_list: result.shader_type_list,
                period_list: result.period_list,
                diagram_type_list: result.diagram_type_list,
                publication_list: result.publication_list,
                prop_name_list: [], //to be added
                statue_type_list: result.statue_type_list,
                culture_list: result.culture_list,
                material_list: result.material_list,
                architectural_type_list: result.architectural_type_list,
                style_list: result.style_list,
            });
    });
};


// Handle Asset search on POST
exports.search_post = (req, res, next) => {

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
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        async.parallel({
            projectId: callback => {
                Project.findOne({'name': fields.project_name}).exec(callback);
            }
        }, (err, results) => {
            if (err) {
                next(err);
            }

            //get the asset template
            let assetTemplate = getNewAssetTemplate(fields);

            if (results.projectId != null) {
                assetTemplate.project = results.projectId;
            }
            console.log("Search for assets : ");
            console.log(fields);
            console.log(assetTemplate);
            return res.redirect('/catalog/assetlist?page=1&sortBy=name&method=1&assetTemplate=' + encodeURI(JSON.stringify(assetTemplate)));
            //find all satisfying assets, sort by asset name
            // Asset.find({$query: assetTemplate, $orderby: {'name': 1}}).exec((err, list_asset) => {
            //     if (err) {
            //         return next(err);
            //     }
            //     if (list_asset.length == 0) {
            //         res.render('success', {title: 'empty', massage: 'empty!'});
            //     }
            //     else {
            //         console.log(list_asset.length);
            //         res.render('assetlist', {
            //             list_asset: list_asset,
            //             assetNum: list_asset.length,
            //             assetTemplate:  encodeURI(JSON.stringify(assetTemplate)),
            //             page:1,
            //             sortBy:'name',
            //             method: 1
            //         });
            //         return res.redirect('/catalog/assetlist?list_asset')
            //     }
            // })
        })
    });
};


let getNewAssetTemplate = fields => {
    let assetTemplate = createNewAsset(fields);
    switch (fields.asset_type) {
        case 'Asset':
            break;
        case 'Shader':
            if (fields.shader_type_name != '-1') {
                assetTemplate.shaderType = fields.shader_type_name;
            }
            break;
        case 'Diagram':
            if (fields.diagram_type_name != '-1') {
                assetTemplate.diagramType = fields.diagram_type_name;
            }
            if (fields.publication_name != '-1') {
                assetTemplate.originalPublication = fields.publication_name;
            }
            if (fields.site_name != '') {
                assetTemplate.site = fields.site_name;
            }
            break;
        case 'Statue':
            if (fields.statue_type_name != '-1') {
                assetTemplate.statueType = fields.statue_type_name;
            }
            if (fields.statue_culture_name != '-1') {
                assetTemplate.statueCulture = fields.statue_culture_name;
            }
            if (fields.material_name != '-1') {
                assetTemplate.material = fields.material_name;
            }
            if (fields.pose_name != '') {
                assetTemplate.pose = fields.pose_name;
            }
            if (fields.location_name != '') {
                assetTemplate.location = fields.location_name;
            }
            if (fields.gender != 'uncertain') {
                assetTemplate.gender = fields.gender;
            }
            break;
        case 'Architectural Element':
            if (fields.architectural_culture_name != '-1') {
                assetTemplate.architecturalCulture = fields.architectural_culture_name;
            }
            if (fields.architectural_type_name != '-1') {
                assetTemplate.architecturalElementType = fields.architectural_type_name;
            }
            if (fields.style_name != '-1') {
                assetTemplate.style = fields.style_name;
            }
            break;
        case 'Prop':
            break;
    }
    return assetTemplate;
};

//create a new asset template based on the request
let createNewAsset = fields => {
    let assetTemplate = {};

    assetTemplate.valid=true;

    if (fields.asset_name != '') {
        assetTemplate.name = fields.asset_name;
    }
    if (fields.asset_type != 'Asset') {
        assetTemplate.type = fields.asset_type;
    }
    if (fields.reference != '-1') {
        assetTemplate.reference = fields.reference;
    }
    if (fields.directory != '') {
        assetTemplate.fakeDirectory = fields.directory;
    }
    if (fields.period_name != '-1') {
        assetTemplate.period = fields.period_name;
    }

    return assetTemplate;
};
