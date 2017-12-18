/**
 * Controller for asset creation
 */

var con = require('./databasecontroller')
var app = require('../app')
var json = require('json')
var exp = require('express')
var formidable = require('formidable');
var fs = require('fs');

//get method for asset create
exports.create_get = function(req, res, next){
    var sql = "select * from sys.reference";

    //selection all reference from the database
    var query = con.query(sql);
    var reference_list = []
    query.on('result', function(row) {
        console.log(row);
        reference_list.push(row);
    });
    query.on('end',function(){
        console.log(reference_list);
        res.render('create_form', {title: 'Create a New Asset', reference_list: reference_list});
    })

}

//find the project which (partially) contains the name
//not used at the moment
function find_project_from_db(name, callback){
    var sql = "select * from sys.project where name like \'%" + name + "%'"
    var project_list = [];
    var query = con.query(sql);

    query.on('error', function(err) {
        throw err;
    });

    query.on('result', function(row) {
        console.log(row);
        project_list.push(row);
    });

    query.on('end',function(){
        callback(project_list);
    });
}

//select all the reference from the database

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
exports.select_all_project = function(req, res){
    find_project_from_db('', function(results){
        res.end(JSON.stringify(results));
    });
}

//select all the reference for selection bar
exports.select_all_reference = function(req, res){
    find_all_reference_from_db( function(results){
        res.end(JSON.stringify(results));
    });
};

//the post method for asset create
exports.create_post = function(req, res, next) {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {

        sql = 'insert into sys.asset values \( default, \'' + fields.asset_name + '\'\, ';
        //console.log(fields.asset_name);
        if(fields.project_name != ''){
            sql += '(select idProject from sys.project where name = \'' + fields.project_name.toString() + '\'\)\, ';
        }else{
            sql += 'default, ';
        };
        if(fields.reference != '-1'){
            sql += '\'' + fields.reference + '\', ';
        }
        else{
            sql += 'default, ';
        };


        var oldpath = files.file_upload.path;
        var newpath = 'C:/Users/Render4/WebstormProjects/lithodomosVR/file/' + files.file_upload.name;
        sql += '\'' + newpath + '\'\)';
        console.log(sql);

        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            var query = con.query(sql);
            query.on('end',function(){
                res.render('success', {title: 'Asset creation success'});
            });
            //alert();
        });
    });

};