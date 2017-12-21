/**
 * Controller for asset creation
 */

var con = require('./databasecontroller');
var app = require('../app');
var json = require('json');
var exp = require('express');
var formidable = require('formidable');
var fs = require('fs');
var Asset = require('../models/asset')
var Reference = require('../models/reference');
var Project = require('../models/project');
var uniqid = require('uniqid');
var ObjectID = require("bson-objectid");
const path = require('path')
//get method for asset create
exports.create_get = function(req, res, next){
    // var sql = "select * from sys.reference";
    //
    // //selection all reference from the database
    // var query = con.query(sql);
    // var reference_list = []
    // query.on('result', function(row) {
    //     console.log(row);
    //     reference_list.push(row);
    // });
    // query.on('end',function(){
    //     console.log(reference_list);
    //     res.render('createForm', {title: 'Create a New Asset', reference_list: reference_list});
    // })
    Reference.find()
        .exec( (err, reference_list) => {
            if (err)  {return next(err);}
            //console.log(reference_list);
            res.render('createForm', {title: 'Create a New Asset', reference_list: reference_list});
        })

}

//find the project which (partially) contains the name
//not used at the moment
var find_all_project_from_db = callback => {
    // var sql = "select * from sys.project where name like \'%" + name + "%'"
    // var project_list = [];
    // var query = con.query(sql);
    //
    // query.on('error', function(err) {
    //     throw err;
    // });
    //
    // query.on('result', function(row) {
    //     console.log(row);
    //     project_list.push(row);
    // });
    //
    // query.on('end',function(){
    //     callback(project_list);
    // });
    Project.find()
        .exec( (err, project_list) => {
            if (err)  {return next(err);}
            console.log(project_list);
            callback(project_list)
        })
}

//select all the reference from the database
//not used at the moment
function find_all_reference_from_db(callback){
    var sql = "select * from sys.reference"
    var reference_list = [];
    var query = con.query(sql);

    query.on('error', function(err) {
        throw err;
    });

    query.on('result', function(row) {
        console.log(row);
        reference_list.push(row);
    });

    query.on('end',function(){
        callback(reference_list);
    });
}

//select project which contains the name
//not used at the moment
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
        // fields.sanitize('name').escape();
        // fields.sanitize('project_name').escape();
        // fields.sanitize('reference').escape();
        // fields.sanitize('fakeDirectory').escape();
        //
        // fields.sanitize('name').trim();
        // fields.sanitize('project_name').trim();
        // fields.sanitize('reference').trim();
        // fields.sanitize('fakeDirectory').trim();
        console.log(fields.project_name);
        Project.findOne({'name':fields.project_name})
            .exec( (err, found_project) => {
                console.log(found_project);
                if(err) {return next(err);}
                var assetDetail = {
                    _id: ObjectID(),
                    name: fields.asset_name,
                    project: found_project.id,
                    reference: fields.reference,
                    //fakeDirectory: req.body.fakeDirectory,
                    fileName: files.file_upload.name,
                };
                var oldpath = files.file_upload.path;
                var newpath = 'C:/Users/Render4/WebstormProjects/lithodomosAMS/file/' + assetDetail._id ;
                assetDetail.trueLocation = newpath;

                var newAsset = new Asset(assetDetail);

                newAsset.save( err => {
                    if(err) {return next(err);}

                    //success, save and rename the file
                    fs.rename(oldpath, newpath, err => {
                        if (err) {return next(err);}
                        res.render('success', {title: 'Asset creation success'});
                        // var query = con.query(sql);
                        // query.on('end', () => {
                        //     res.render('success', {title: 'Asset creation success'});
                        // });
                        //alert();
                    });
                })
            })

    });

};