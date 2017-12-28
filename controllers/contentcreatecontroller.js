/**
 * Controller for content(different attributes of asset) creation
 */
var con = require('./databasecontroller');
var app = require('../app');
var json = require('json');
var Reference = require('../models/reference');
var Project = require('../models/project');
var content_name = "";

//handle content create on get
exports.content_create_get = function(req, res, next){
    content_name = req.query.content_name
    res.render('contentCreate', {title: 'Create a New ' + content_name , content_name: req.query.content_name });
};

//handle content create on post
exports.content_create_post = function(req, res, next){
    req.checkBody('content_name', content_name + ' name must be specified.').notEmpty();
    req.sanitize('content_name').escape();

    var query = con.query("insert into sys." + content_name + ' values \(default, \'' + req.body.content_name + '\'\)' );
    console.log("Query: insert into sys." + content_name + ' values \(default, \'' + req.body.content_name + '\'\)' );

    query.on('end',function(){
            //if insert successfully jump to the success page
            //res.render('homepage',{title:'New ' + content_name + ' creation success'});
        })
};

exports.content_create_modal_post = function(req, res, next){
    req.checkBody('content_name', content_name + ' name must be specified.').notEmpty();
    req.sanitize('content_name').escape();
};

exports.project_create_get = (req, res, next) => {
    var projectDetail = {name:req.query.name};
    Project.count(projectDetail,(err, project_count) => {
        if(err) {next(err)};
        if(project_count > 0){
            res.end('Project exists!');
            return;
        }

        //if not exist, create new project
        var newProject = new Project(projectDetail);
        newProject.save(err => {
            if(err) {next(err); }

            //success
            res.end('Project Created successfully!')
        })
    })
}

exports.reference_create_get = (req, res, next) => {
    var referenceDetail = {name:req.query.name};
    Reference.count(referenceDetail,(err, reference_count) => {
        if(err) {next(err)};
        if(reference_count > 0){
            res.end('Reference exists!');
            return;
        }

        //if not exist, create new reference
        var newReference = new Reference(referenceDetail);
        newReference.save(err => {
            if(err) {next(err); }
            var resText = {};
            resText.message = 'New reference create successfully!';

            resText.newReference= newReference;
            //success
            res.end(JSON.stringify(resText));
        })
    })
}