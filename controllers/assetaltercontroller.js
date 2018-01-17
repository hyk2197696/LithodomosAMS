/**
 * Controller for asset alter
 */
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
const Prop = require('../models/prop');
const dateFormat = require('dateformat');

//asset alter page get method, select all attribute from the database and display in form
//all the lists are for input selection
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
                .populate('propName', Prop)
                .exec(callback)
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
        },
        prop_list: callback => {
            Prop.find().exec(callback);
        }
    }, (err, result) => {
        if (err) {
            return next(err);
        }

        //successful
        //render the form page with all the information selected
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
                prop_list: result.prop_list
            });
    })
};

//post method for asset alter
exports.alter_post = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields) => {
        //for checking if the project exists in the database
        async.parallel({
            projectId: callback => {
                Project.findOne({'name': fields.project_name}).exec(callback);
            }
        }, (err, results) => {
            if (err) {
                next(err);
            }

            //if nothing's wrong, create a new template for the new asset
            //get the asset template
            const assetTemplate = getNewAssetTemplate(fields);
            assetTemplate.lastAlterTime = Date.now();
            if (results.projectId !== null) {
                assetTemplate.project = results.projectId;
            }
            console.log('update asset:');
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
};

//get method for version control page
exports.version_control_get = (req, res, next) => {
    let assetTemplate = {_id: req.query.id, valid: true};
    Asset.findOne(assetTemplate).exec((err, result) => {
        res.render('versionControl', {asset: result});
    })

};

//function to deal with the version change request.
// get a version from the user and set that as the default version
exports.version_change = (req, res, next) => {
    Asset.findOne({_id: req.body.id, valid: true}).exec((err, result) => {
        for (let i = 0; i < result.history.length; i++) {
            result.history[i].activated = false;
        }
        result.history[req.body.version].activated = true;

        Asset.findByIdAndUpdate(req.body.id, result, {}, err => {
            if (err) {
                return next(err);
            }
            res.redirect('/catalog/asset?id=' + req.body.id);
        })
    })
};

//handling the file upload operation
exports.file_update = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            return next(err);
        }


        Asset.findOne({_id: fields.id, valid: true}).exec((err, result) => {
            //rename new files with its id and the version
            result.version += 1;
            const oldpath = files.file_upload.path;
            const newpath = result.trueLocation + result._id + '_version' + result.version;
            let newHistory = {
                name: result._id + '_version' + result.version,
                version: result.version,
                activated: true,
                description: fields.description,
                updateTime: dateFormat(Date.now(), 'yyyy-mm-dd hh:MM:ss'),
                updatedBy: req.user.email
            };


            //reset the activated status of all the different versions
            for (let i = 0; i < result.history.length; i++) {
                result.history[i].activated = false;
            }
            result.history.push(newHistory);

            //update the asset version history
            Asset.findByIdAndUpdate(fields.id, result, {}, err => {
                if (err) {
                    return next(err);
                }


                fs.rename(oldpath, newpath, err => {
                    if (err) {
                        return next(err);
                    }
                    res.render('homepage', {title: 'Version Updated'});
                });
            })
        });

    });
};

//generate the new asset template from the parameter fields
//this method need all attributes of an asset
//the attributes which reference another schema will be either '-1' or ObjectId with '-1' represent null
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
            assetTemplate.propType = fields.prop_type;
            assetTemplate.propName = fields.prop_name === '-1' ? null : fields.prop_name;
            break;
    }
    return assetTemplate;
};

//create a new asset template based on the fields
//name, type and directory can not be null
let createNewAsset = fields => ({
    name: fields.asset_name,
    type: fields.asset_type,
    reference: fields.reference == '-1' ? null : fields.reference,
    fakeDirectory: fields.directory,
    period: fields.period_name == '-1' ? null : fields.period_name,
});
