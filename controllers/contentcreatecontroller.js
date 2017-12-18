/**
 * Controller for content(different attributes of asset) creation
 */
var con = require('./databasecontroller')
var app = require('../app')
var json = require('json')
var content_name = ""

//handle content create on get
exports.content_create_get = function(req, res, next){
    content_name = req.query.content_name
    res.render('content_create_form', {title: 'Create a New ' + content_name , content_name: req.query.content_name });

}

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
}