/**
 * Controller for asset display
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
var FakeDirectory = require('../models/fakeDirectory');
var ObjectID = require("bson-objectid");
var path = require('path');

//get method for asset display, find an asset by id and send back asset details
exports.asset_get = (req, res, next) => {
    console.log('New query: finding asset id = ' + req.query.id);
    Asset.findById(req.query.id)
        .populate('project', Project)
        .populate('fakeDirectory', FakeDirectory)
        .populate('reference', Reference)
        .populate('period', Period)
        .populate('shaderType', ShaderType)
        .populate('diagramType', DiagramType)
        .populate('originalPublication', Publication)
        .populate('statueType', StatueType)
        .populate('statueCulture', Culture)
        .populate('material', Material)
        .populate('architecturalCulture', Culture)
        .populate('architecturalElementType', ArchitecturalElementType)
        .populate('style', Style)
        .exec((err, asset_datail) => {
            if (err) {
                return next(err);
            }
            console.log(asset_datail);
            res.render('asset', {title: asset_datail.name, asset: asset_datail})
        })

};

//method for asset downloading, find asset by id and rename the file as it was when uploaded
exports.asset_download = (req, res, next) => {
    Asset.findById(req.query.id, (err, result) => {
        if (err) {
            return next(err);
        }
        res.download(result.trueLocation, result.fileName);
    });
};

//find all assets
exports.all_asset = (req, res, next) => {
    Asset.find().sort({'name': 1}).exec((err, list_asset) => {
        if (err) {
            return next(err);
        }
        if (list_asset.length == 0) {
            res.render('success', {title: 'empty', massage: 'empty!'});
        }
        else {
            //console.log(list_asset);
            res.render('assetList', {list_asset: list_asset})
        }
    })
};