var con = require('./databasecontroller');
var app = require('../app');
var formidable = require('formidable');
var fs = require('fs');
var Asset = require('../models/asset');
var mongoose = require('mongoose');
var Model = require('../models/model');
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
//index page
exports.index = function(req, res, next){

    Asset.count((err, countAsset)=> {
        if (err) {return next(err);}
        res.render('homepage', {title: 'Lithodomos Asset Management System', assetnum: countAsset});
    });
};


//all of the following is for testing
exports.test = function(req, res, next) {

    // var PersonSchema = new Schema({
    //     name : String
    // }, { collection : 'users' });
    //
    // var EmployeeSchema = PersonSchema.extend({
    //     department : String
    // });
    //
    // var Person = mongoose.model('Person', PersonSchema),
    //     Employee = mongoose.model('Employee', EmployeeSchema);
    //
    // var Brian = new Employee({
    //     name : 'Brian Kirchoff',
    //     department : 'Engineering'
    // });

    // var modelDetail = {
    //     name: 'model 1',
    //     fakeDirectory: '5a42cc65c506b50dcc52b18d',
    //     trueLocation: 'null',
    //     filename: 'null',
    //     levelOfDetail:'high'
    // };
    // Asset
    //
    // var newmodel = new Model(modelDetail);
    //
    // newmodel.save(err => {
    //     console.log('model:');
    //     console.log(newmodel)
    // });
    //
    //
    // Asset.find({name:'model 1'}).exec((err,result) => {
    //     console.log('all models');
    //     console.log(result);
    // })
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
