/**
 * Controller for asset display
 */

var con = require('./databasecontroller');
var app = require('../app');
var Asset = require('../models/asset');
var Project = require('../models/project');
var Reference = require('../models/reference');
var FakeDirectory = require('../models/fakeDirectory');


//get method for asset display, find an asset by id and send back asset details
exports.asset_get = function(req, res, next){
    console.log('New query: finding asset id = ' + req.query.id);
    Asset.findById( req.query.id )
        .populate('project', Project)
        .populate('fakeDirectory',FakeDirectory)
        .populate('reference',Reference)
        .exec((err, asset_datail) => {
            if (err)  {return next(err);}
            console.log(asset_datail);
            res.render('asset', { title: asset_datail.name, asset : asset_datail})
        })

}

//method for asset downloading, find asset by id and rename the file as it was when uploaded
exports.asset_download = (req, res,next) => {
    Asset.findById(req.query.id, (err, result) => {
        if(err) {return next(err);}
        res.download(result.trueLocation,result.fileName);
    });
}