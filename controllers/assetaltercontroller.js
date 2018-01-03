/**
 * Controller for asset alter
 */
var con = require('./databasecontroller')
var app = require('../app');
var async = require('async');
var Asset = require('../models/asset');
var Reference = require('../models/reference');
var Project = require('../models/project');
//asset alter page get method, select all attribute from the database and display in a form
exports.alter_get = (req, res, next) => {
    async.parallel({
        asset: callback => {
            Asset.findById(req.query.id).populate('reference').populate('project').populate('fakeDirectory').exec(callback);
        },
        reference_list: callback => {
            Reference.find().exec(callback);
        },
    }, (err, result) => {
        if(err) {return next(err);  }
        //successful
        res.render('assetAlter', {title: 'Asset Alter', asset: result.asset, reference_list: result.reference_list});
    })
}

//post method for asset alter
exports.alter_post = (req, res, next) =>  {
    Project.findOne({'name':req.body.project_name})
        .exec( (err, found_project) => {
            //judge if the following attributes of the asset is not defined
        var projectId = found_project == null? null:found_project.id;
        var referenceId = req.body.reference == '-1'? null : req.body.reference;
        //var fakeDirectoryId = fields.directory == 'null'? null: fields.directory;

        if(err) {return next(err);}

        //if nothing wrong, create a new template for the new asset
        var assetDetail = {
            name: req.body.asset_name,
            project: projectId,
            reference: referenceId,
            fakeDirectory: req.body.directory,
        };
        //console.log(assetDetail);
        //update the database
        Asset.findByIdAndUpdate(req.query.id, assetDetail, {}, (err) => {
            if (err) {return next(err); }
            res.render('success', {title: 'Asset update success'});
        })


    })
};
