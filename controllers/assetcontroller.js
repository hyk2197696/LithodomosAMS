/**
 * Controller for asset display
 */

var con = require('./databasecontroller');
var app = require('../app');
var Asset = require('../models/asset');
var Project = require('../models/project');
var Reference = require('../models/reference');
var FakeDirectory = require('../models/fakeDirectory');
//get method for asset list display
// exports.list_get = function(req, res, next){
//     var query = con.query("select count(*) as countAsset from sys.asset");
//     query.on('error', function(err) {
//         throw err;
//     });
//
//     query.on('result', function(row) {
//         //console.log(row);
//         res.render('homepage', {title: 'Lithodomos Asset Management System', assetnum: row.countAsset});
//     });
// }

//get method for asset display
exports.asset_get = function(req, res, next){
    // sql = "select *  from sys.asset where id = " + req.query.id;
    //
    // //select all the information of the specific asset
    // console.log("new query:");
    // console.log(sql);
    //
    // var query = con.query(sql);
    // query.on('error', function(err) {
    //     throw err;
    // });
    //
    // query.on('result', function(row) {
    //     console.log(row);
    //     res.render('asset', {title: row.name , asset: row});
    // });
    console.log('New query: finding asset id = ' + req.query.id);
    Asset.findById( req.query.id )
        .populate('project', Project)
        .populate('fakeDirectory',FakeDirectory)
        .populate('reference',Reference)
        .exec( (err, asset_datail) => {
            if (err)  {return next(err);}
            console.log(asset_datail);
            res.render('asset', { title: asset_datail.name, asset : asset_datail})

        })

}

//method for asset downloading
exports.asset_download = function(req, res,next) {
    var sql = 'select directory from sys.asset where id = ' + req.query.id;
    console.log(sql);
    var query = con.query(sql);
    query.on('result', function (row){
        console.log(" result : ");
        console.log(row);
        console.log(row.directory);
        res.download(row.directory);
    });
}