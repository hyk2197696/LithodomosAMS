/**
 * Controller for asset alter
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
var uniqid = require('uniqid');
var ObjectID = require("bson-objectid");
var path = require('path');
//asset alter page get method, select all attribute from the database and display in a form
exports.alter_get = (req, res, next) => {
    async.parallel({
        asset: callback => {
            Asset.findById( req.query.id )
                .populate('project', Project)
                .populate('fakeDirectory',FakeDirectory)
                .populate('reference',Reference)
                .populate('period',Period)
                .populate('shaderType',ShaderType)
                .populate('diagramType',DiagramType)
                .populate('originalPublication',Publication)
                .populate('statueType',StatueType)
                .populate('statueCulture',Culture)
                .populate('material',Material)
                .populate('architecturalCulture',Culture)
                .populate('architecturalElementType',ArchitecturalElementType)
                .populate('style',Style)
                .exec(callback)
            },
        reference_list: callback => {
            Reference.find().exec(callback);
        },
        reference_list: callback => {
            Reference.find().exec(callback);
        },
        period_list: callback => {
            Period.find().exec(callback);
            },
        statue_type_list: callback => {
            StatueType.find().exec(callback);
        },
        culture_list: callback => {
            Culture.find().exec(callback);
        },
        material_list: callback => {
            Material.find().exec(callback);
        },
        architectural_type_list: callback => {
            ArchitecturalElementType.find().exec(callback);
        },
        style_list: callback => {
            Style.find().exec(callback);
        },
        shader_type_list: callback => {
            ShaderType.find().exec(callback);
        },
        diagram_type_list: callback => {
            DiagramType.find().exec(callback);
        },
        publication_list: callback => {
            Publication.find().exec(callback);
        }
    }, (err, result) => {
        if(err) {return next(err);  }
        //successful
        res.render('assetAlter',
            {title: 'Asset Alter',
                asset: result.asset,
                reference_list:result.reference_list,
                shader_type_list:result.shader_type_list,
                period_list:result.period_list,
                diagram_type_list:result.diagram_type_list,
                publication_list:result.publication_list,
                prop_name_list:[],
                statue_type_list:result.statue_type_list,
                culture_list:result.culture_list,
                material_list:result.material_list,
                architectural_type_list:result.architectural_type_list,
                style_list:result.style_list,
            });
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
