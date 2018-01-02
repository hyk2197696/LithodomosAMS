/**
 * Controller for asset creation
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
//get method for asset create
exports.create_get = function(req, res, next){
    Reference.find()
        .exec( (err, reference_list) => {
            if (err)  {return next(err);}
            //console.log(reference_list);
            res.render('createForm', {title: 'Create a New Asset', reference_list: reference_list, shader_type_list:[], period_name_list:[]});
        })

};


//get method for asset create. select all the information need to build up the page asynchronously and render the page
exports.asset_create_get = function(req, res, next){
    // Reference.find()
    //     .exec( (err, reference_list) => {
    //         if (err)  {return next(err);}
            //console.log(reference_list);
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

        res.render('assetCreate',
            {title: 'Create a New Asset',
                reference_list:result.reference_list,
                shader_type_list:result.shader_type_list,
                period_list:result.period_list,
                diagram_type_list:result.diagram_type_list,
                publication_list:result.publication_list,
                prop_name_list:[],
                statue_type_list:result.statue_type_list,
                culture_list:result.culture_list,
                material_list:result.material_list,
                architectural_type_list:result.architectural_type_list,
                style_list:result.style_list,
            });
        });
};

//find the project which (partially) contains the name
//not used at the moment
var find_all_project_from_db = callback => {
    Project.find()
        .exec( (err, project_list) => {
            if (err)  {return next(err);}
            //console.log(project_list);
            callback(project_list)
        })
}
exports.select_project = function(req, res){

    find_project_from_db(req.query.name, function(results){
        res.end(JSON.stringify(results));
    });


}

//select all the project for typeahead of project field
exports.select_all_project = (req, res) => {
    find_all_project_from_db(results => {
        res.end(JSON.stringify(results));
    });
};

//get all distinct sites
exports.select_all_site = (req, res) => {
    Asset.distinct('site').exec((err, results) => {
        console.log(results);
        res.end(JSON.stringify(results));
    })
}

//select all the reference for selection menu
//not used at the moment
exports.select_all_reference = function(req, res){
    find_all_reference_from_db( function(results){
        res.end(results);
    });
};

//the post method for asset create
exports.create_post = (req, res, next) =>  {

    var form = new formidable.IncomingForm();
    form.parse(req,  (err, fields, files) => {
        console.log(fields.project_name);
        Project.findOne({'name':fields.project_name})
            .exec( (err, found_project) => {
                //judge if the following attributes of the asset is not defined
                var projectId = found_project == null? null:found_project.id;
                var referenceId = fields.reference == '-1'? null : fields.reference;
                //var fakeDirectoryId = fields.directory == 'null'? null: fields.directory;

                if(err) {return next(err);}

                //if nothing wrong, create a new template for the new asset
                var assetDetail = {
                    _id: ObjectID(),
                    name: fields.asset_name,
                    project: projectId,
                    reference: referenceId,
                    fakeDirectory: fields.directory,
                    fileName: files.file_upload.name,
                };
                console.log("Insert new asset : ");
                console.log(  assetDetail);

                //save the uploaded file and rename it using it's id, add the really file name and true location into the asset template
                var oldpath = files.file_upload.path;
                var newpath = 'C:/Users/Render4/WebstormProjects/lithodomosAMS/file/' + assetDetail._id ;
                assetDetail.trueLocation = newpath;

                var newAsset = new Asset(assetDetail);

                //insert the asset into the database
                newAsset.save( err => {
                    if(err) {return next(err);}

                    //success, save and rename the file
                    fs.rename(oldpath, newpath, err => {
                        if (err) {return next(err);}
                        res.render('success', {title: 'Asset creation success'});
                    });
                })
            })

    });

};

exports.asset_create_post = (req, res, next) =>  {

    var form = new formidable.IncomingForm();
    form.parse(req,  (err, fields, files) => {
        console.log(fields.project_name);
        Project.findOne({'name':fields.project_name})
            .exec( (err, found_project) => {
                //judge if the following attributes of the asset is not defined
                var projectId = found_project == null? null:found_project.id;
                var referenceId = fields.reference == '-1'? null : fields.reference;
                //var fakeDirectoryId = fields.directory == 'null'? null: fields.directory;

                if(err) {return next(err);}

                //if nothing wrong, create a new template for the new asset
                var assetDetail = {
                    _id: ObjectID(),
                    name: fields.asset_name,
                    project: projectId,
                    reference: referenceId,
                    fakeDirectory: fields.directory,
                    fileName: files.file_upload.name,
                };
                console.log("Insert new asset : ");
                console.log(  assetDetail);

                //save the uploaded file and rename it using it's id, add the really file name and true location into the asset template
                var oldPath = files.file_upload.path;
                var newPath = 'C:/Users/Render4/WebstormProjects/lithodomosAMS/file/' + assetDetail._id ;
                assetDetail.trueLocation = newpath;

                var newAsset = new Asset(assetDetail);

                //insert the asset into the database
                newAsset.save( err => {
                    if(err) {return next(err);}

                    //success, save and rename the file
                    fs.rename(oldpath, newpath, err => {
                        if (err) {return next(err);}
                        res.render('success', {title: 'Asset creation success'});
                    });
                })
            })

    });

};