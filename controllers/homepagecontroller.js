var con = require('./databasecontroller');
var app = require('../app');
var formidable = require('formidable');
var fs = require('fs');
var Asset = require('../models/asset');
var mongoose = require('mongoose');

//index page
exports.index = function(req, res, next){

    Asset.count((err, countAsset)=> {
        if (err) {return next(err);}
        res.render('homepage', {title: 'Lithodomos Asset Management System', assetnum: countAsset});
    });
};


//all of the following is for testing
exports.test = function(req, res, next) {
    //res.download('/file/C&IS Graduate Attributes.pdf');
    res.render('test', {title: 'Lithodomos Asset Management System'});

};

exports.test_post = function(req, res, next) {
    var sql = 'insert into sys.fakedirectory values (default, \'' +req.body.name + '\', 1)';
    console.log(sql);
    con.query('result',function(){
        res.send('?')
    })

}
exports.typeahead_test = (req, res) => {
    res.render('typeaheadTest', {title: 'Lithodomos Asset Management System'});
}



exports.check_folder_existance = function (req, res, next ){
    console.log("success");
    res.end('success');
};

exports.success_get = function(req, res, next) {
    res.render('success', {title: 'Lithodomos Asset Management System'});
};
