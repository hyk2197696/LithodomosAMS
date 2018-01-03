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


//the post method for asset create
exports.create_post = (req, res, next) =>  {

    var form = new formidable.IncomingForm();
    form.parse(req,  (err, fields, files) => {

        Project.findOne({'name':fields.project_name})
            .exec( (err, found_project) => {
                //if the following attributes of the asset is not defined
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
    form.parse(req, (err, fields, files) => {
        async.parallel({
            projectId : callback => {
                Project.findOne({'name': fields.project_name}).exec(callback);
            }
        },(err,results) => {
            if(err) {next(err);}

            //get the asset template
            var assetTemplate = getNewAssetTemplate(fields);

            //assetTemplate.project = results.projectId == null? null : results.projectId;
            if(results.projectId != null){
                assetTemplate.project = results.projectId;
            }
            assetTemplate.fileName = files.file_upload.name;
            assetTemplate.fileType = path.extname(files.file_upload.name);


            console.log("Insert new asset : ");
            console.log( assetTemplate);

            //save the uploaded file and rename it using it's id, add the really file name and true location into the asset template
            var oldpath = files.file_upload.path;
            var newpath = 'C:/Users/Render4/WebstormProjects/lithodomosAMS/file/' + assetTemplate._id ;
            assetTemplate.trueLocation = newpath;

            var newAsset = new Asset(assetTemplate);

            //insert the asset into the database
            newAsset.save( err => {
                if(err) {return next(err);}

                //success, save and rename the file
                fs.rename(oldpath, newpath, err => {
                    if (err) {return next(err);}
                    res.render('success', {title: 'Asset creation success'});
                });
            })
        });
    });

};

var getNewAssetTemplate = fields => {
    var assetTemplate = createNewAsset(fields);
    switch(fields.asset_type){
        case 'Asset':
            break;
        case 'Shader':
            assetTemplate.shaderType = fields.shader_type_name == '-1'? null: fields.shader_type_name;

            break;
        case 'Diagram':
            assetTemplate.diagramType = fields.diagram_type_name == '-1'? null: fields.diagram_type_name;
            assetTemplate.originalPublication = fields.publication_name == '-1'? null: fields.publication_name;
            assetTemplate.site = fields.site_name == null? null: fields.site_name;
            break;
        case 'Statue':
            assetTemplate.statueType = fields.statue_type_name == '-1'? null: fields.statue_type_name;
            assetTemplate.statueCulture = fields.statue_culture_name == '-1'? null: fields.statue_culture_name;
            assetTemplate.material = fields.material_name == '-1'? null: fields.material_name;
            assetTemplate.pose = fields.pose_name == null? null: fields.pose_name;
            assetTemplate.gender = fields.gender;
            assetTemplate.location = fields.location_name;
            break;
        case 'Architectural Element':
            assetTemplate.architecturalCulture = fields.architectural_culture_name == '-1'? null: fields.architectural_culture_name;
            assetTemplate.architecturalElementType = fields.architectural_type_name == '-1'? null: fields.architectural_type_name;
            assetTemplate.style = fields.style_name == '-1'? null: fields.style_name;
            break;
        case 'Prop':
            break;
    }
    return assetTemplate;
};

//create a new asset template based on the request
var createNewAsset = fields => {
        var assetTemplate = {
            _id: ObjectID(),
            name:fields.asset_name,
            type: fields.asset_type,
            reference: fields.reference == '-1'? null : fields.reference,
            fakeDirectory: fields.directory,
            period: fields.period_name == '-1'? null : fields.period_name,
        };
        return assetTemplate;
};

//check if the project exist in the database
var projectExistance = (project, callback ) => {
    if(project == '' ){
        callback('',null);
    }
    Project.findOne({'name': project}).exec( (err, result) => {
        var projectId = result == null? null:result.id;
        callback(err,projectId);
    })

};

