/**
 * Controller for asset alter
 */
const con = require('./databasecontroller');
const app = require('../app');
const json = require('json');
const exp = require('express');
const async = require('async');
const formidable = require('formidable');
const fs = require('fs');
const Asset = require('../models/asset');
const Reference = require('../models/reference');
const Period = require('../models/period');
const StatueType = require('../models/statueType');
const ArchitecturalElementType = require('../models/architecturalElementType');
const Culture = require('../models/culture');
const Material = require('../models/material');
const Style = require('../models/style');
const ShaderType = require('../models/shaderType');
const DiagramType = require('../models/diagramType');
const Publication = require('../models/publication');
const Project = require('../models/project');
const FakeDirectory = require('../models/fakeDirectory');
const uniqid = require('uniqid');
const ObjectID = require("bson-objectid");
const path = require('path');
//asset alter page get method, select all attribute from the database and display in a form
exports.alter_get = (req, res, next) => {
    async.parallel({
        asset: callback => {
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
        if (err) {
            return next(err);
        }
        //successful
        res.render('assetAlter',
            {
                title: 'Asset Alter',
                asset: result.asset,
                reference_list: result.reference_list,
                shader_type_list: result.shader_type_list,
                period_list: result.period_list,
                diagram_type_list: result.diagram_type_list,
                publication_list: result.publication_list,
                prop_name_list: [],
                statue_type_list: result.statue_type_list,
                culture_list: result.culture_list,
                material_list: result.material_list,
                architectural_type_list: result.architectural_type_list,
                style_list: result.style_list,
            });
    })
}

//post method for asset alter
exports.alter_post = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        async.parallel({
            projectId: callback => {
                Project.findOne({'name': fields.project_name}).exec(callback);
            }
        }, (err, results) => {
            if (err) {
                next(err);
            }

            //if nothing wrong, create a new template for the new asset
            //get the asset template
            const assetTemplate = getNewAssetTemplate(fields);
            assetTemplate.lastAlterTime = Date.now();
            if (results.projectId != null) {
                assetTemplate.project = results.projectId;
            }
            console.log('update asset:')
            console.log(assetTemplate);
            //update the database
            Asset.findByIdAndUpdate(req.query.id, assetTemplate, {}, (err) => {
                if (err) {
                    return next(err);
                }

                res.render('homepage', {title: 'Asset update success'});
            })
        })
    })
}


let getNewAssetTemplate = fields => {
    const assetTemplate = createNewAsset(fields);
    switch (fields.asset_type) {
        case 'Asset':
            break;
        case 'Shader':
            assetTemplate.shaderType = fields.shader_type_name == '-1' ? null : fields.shader_type_name;

            break;
        case 'Diagram':
            assetTemplate.diagramType = fields.diagram_type_name == '-1' ? null : fields.diagram_type_name;
            assetTemplate.originalPublication = fields.publication_name == '-1' ? null : fields.publication_name;
            assetTemplate.site = fields.site_name == null ? null : fields.site_name;
            break;
        case 'Statue':
            assetTemplate.statueType = fields.statue_type_name == '-1' ? null : fields.statue_type_name;
            assetTemplate.statueCulture = fields.statue_culture_name == '-1' ? null : fields.statue_culture_name;
            assetTemplate.material = fields.material_name == '-1' ? null : fields.material_name;
            assetTemplate.pose = fields.pose_name == null ? null : fields.pose_name;
            assetTemplate.gender = fields.gender;
            assetTemplate.location = fields.location_name;
            break;
        case 'Architectural Element':
            assetTemplate.architecturalCulture = fields.architectural_culture_name == '-1' ? null : fields.architectural_culture_name;
            assetTemplate.architecturalElementType = fields.architectural_type_name == '-1' ? null : fields.architectural_type_name;
            assetTemplate.style = fields.style_name == '-1' ? null : fields.style_name;
            break;
        case 'Prop':
            break;
    }
    return assetTemplate;
};

//create a new asset template based on the request
let createNewAsset = fields => ({
    name: fields.asset_name,
    type: fields.asset_type,
    reference: fields.reference == '-1' ? null : fields.reference,
    fakeDirectory: fields.directory,
    period: fields.period_name == '-1' ? null : fields.period_name,
});

