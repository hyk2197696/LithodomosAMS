/**
 * Controller for asset creation
 */

var con = require('./databasecontroller');
var app = require('../app');
var json = require('json');
var exp = require('express');
var formidable = require('formidable');
var fs = require('fs');
var Asset = require('../models/asset');
var Reference = require('../models/reference');
var Project = require('../models/project');
var uniqid = require('uniqid');
var ObjectID = require("bson-objectid");
const path = require('path')
//get method for asset create
exports.create_get = function(req, res, next){
    Reference.find()
        .exec( (err, reference_list) => {
            if (err)  {return next(err);}
            //console.log(reference_list);
            res.render('createForm', {title: 'Create a New Asset', reference_list: reference_list, shader_type_list:[]});
        })

}

exports.asset_create_get = function(req, res, next){
    // Reference.find()
    //     .exec( (err, reference_list) => {
    //         if (err)  {return next(err);}
    //         //console.log(reference_list);
            res.render('assetCreate', {title: 'Create a New Asset', reference_list:[], shader_type_list:[]});
        // })

}

//find the project which (partially) contains the name
//not used at the moment
var find_all_project_from_db = callback => {
    Project.find()
        .exec( (err, project_list) => {
            if (err)  {return next(err);}
            console.log(project_list);
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