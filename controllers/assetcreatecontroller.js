/**
 * Controller for asset creation
 */
const async = require('async');
const formidable = require('formidable');
const fs = require('fs');
const Asset = require('../models/asset');

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
const Prop = require('../models/prop');
const ObjectID = require("bson-objectid");
const path = require('path');
const dateFormat = require('dateformat');
//get method for asset create
exports.create_get = (req, res, next) => {
    // Reference.find()
    //     .exec((err, reference_list) => {
    //         if (err) {
    //             return next(err);
    //         }
    //         //console.log(reference_list);
    //         res.render('createForm', {
    //             title: 'Create a New Asset',
    //             reference_list: reference_list,
    //             shader_type_list: [],
    //             period_name_list: []
    //         });
    //     })

};


//get method for asset create. select all the information need to build up the page asynchronously and render the page
exports.asset_create_get = (req, res, next) => {
    async.parallel({
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

        res.render('assetCreate',
            {
                title: 'Create a New Asset',
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
                prop_list: result.prop_list,
                folderId: (req.query.folderId===null || req.query.folderId === '' )?null:req.query.folderId
            });
    });
};


//the post method for asset create
exports.create_post = (req, res, next) => {

    // const form = new formidable.IncomingForm();
    // form.parse(req, (err, fields, files) => {
    //
    //     Project.findOne({'name': fields.project_name})
    //         .exec((err, found_project) => {
    //             //if the following attributes of the asset is not defined
    //             const projectId = found_project === null ? null : found_project.id;
    //
    //             if (err) {
    //                 return next(err);
    //             }
    //
    //             //if nothing wrong, create a new template for the new asset
    //             let assetDetail = {
    //                 _id: ObjectID(),
    //                 name: fields.asset_name,
    //                 project: projectId,
    //                 reference: referenceId,
    //                 fakeDirectory: fields.directory,
    //                 fileName: files.file_upload.name,
    //             };
    //
    //
    //             //save the uploaded file and rename it using it's id, add the really file name and true location into the asset template
    //             const oldpath = files.file_upload.path;
    //             const newpath = '/file/' + assetDetail._id;
    //             assetDetail.trueLocation = newpath;
    //
    //             const newAsset = new Asset(assetDetail);
    //
    //             //insert the asset into the database
    //             newAsset.save(err => {
    //                 if (err) {
    //                     return next(err);
    //                 }
    //
    //
    //
    //                 //success, save and rename the file
    //                 console.log("Insert new asset : ");
    //                 console.log(newAsset);
    //                 fs.rename(oldpath, newpath, err => {
    //                     if (err) {
    //                         return next(err);
    //                     }
    //                     res.render('success', {title: 'Asset creation success'});
    //                 });
    //             })
    //         })
    //
    // });

};

//post method for full asset create
exports.asset_create_post = (req, res, next) => {

    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        async.parallel({
            projectId: callback => {
                Project.findOne({'name': fields.project_name}).exec(callback);
            }
        }, (err, results) => {
            if (err) {
                next(err);
            }

            //get the asset template
            let assetTemplate = getNewAssetTemplate(fields);

            //assetTemplate.project = results.projectId == null? null : results.projectId;
            if (results.projectId !== null) {
                assetTemplate.project = results.projectId;
            }
            //assetTemplate.fileName = files.file_upload.name;
            assetTemplate.fileType = path.extname(files.file_upload.name);




            //save the uploaded file and rename it using it's id, add the really file name and true location into the asset template
            const oldpath = files.file_upload.path;
            let dir = process.cwd().replace(/\\/g,'/') + '/./file';
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }

            //build the file structure for storing assets. See document for more details
            dir += '/' + assetTemplate._id.toString().charAt(assetTemplate._id.toString().length - 1);
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            dir += '/' + assetTemplate._id.toString().charAt(assetTemplate._id.toString().length - 2);
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }

            assetTemplate.trueLocation = dir + '/';

            //for version control
            let prototypeName = assetTemplate._id + '_version' +assetTemplate.version;
            let newHistory = {
                name: prototypeName,
                version: assetTemplate.version,
                activated: true,
                fileName:files.file_upload.name,
                description: 'First uploaded version',
                updateTime: dateFormat(Date.now(),'yyyy-mm-dd hh:MM:ss'),
                updatedBy: req.user.email
            };
            assetTemplate.history = [];
            assetTemplate.history.push(newHistory);
            const newpath = assetTemplate.trueLocation + prototypeName;


            console.log('directory' + newpath);
            const newAsset = new Asset(assetTemplate);

            //insert the asset into the database
            newAsset.save(err => {
                if (err) {
                    return next(err);
                }
                console.log("Insert new asset : ");
                console.log(assetTemplate);
                //success, save and rename the file
                fs.rename(oldpath, newpath, err => {
                    if (err) {
                        return next(err);
                    }
                    res.render('homepage', {title: 'Asset creation success'});
                });
            })
        });
    });

};

//build the asset template by the post information
let getNewAssetTemplate = fields => {
    let assetTemplate = createNewAsset(fields);
    switch (fields.asset_type) {
        case 'Asset':
            break;
        case 'Shader':
            assetTemplate.shaderType = fields.shader_type_name === '-1' ? null : fields.shader_type_name;

            break;
        case 'Diagram':
            assetTemplate.diagramType = fields.diagram_type_name === '-1' ? null : fields.diagram_type_name;
            assetTemplate.originalPublication = fields.publication_name === '-1' ? null : fields.publication_name;
            assetTemplate.site = fields.site_name === null ? null : fields.site_name;
            break;
        case 'Statue':
            assetTemplate.statueType = fields.statue_type_name === '-1' ? null : fields.statue_type_name;
            assetTemplate.statueCulture = fields.statue_culture_name === '-1' ? null : fields.statue_culture_name;
            assetTemplate.material = fields.material_name === '-1' ? null : fields.material_name;
            assetTemplate.pose = fields.pose_name === null ? null : fields.pose_name;
            assetTemplate.gender = fields.gender;
            assetTemplate.location = fields.location_name;
            break;
        case 'Architectural Element':
            assetTemplate.architecturalCulture = fields.architectural_culture_name === '-1' ? null : fields.architectural_culture_name;
            assetTemplate.architecturalElementType = fields.architectural_type_name === '-1' ? null : fields.architectural_type_name;
            assetTemplate.style = fields.style_name === '-1' ? null : fields.style_name;
            break;
        case 'Prop':
            assetTemplate.propType = fields.prop_type;
            assetTemplate.propName = fields.prop_name === '-1'? null: fields.prop_name;
            break;
    }
    return assetTemplate;
};

//create a new asset template based on the request
let createNewAsset = fields => {

    return {
        _id: ObjectID(),
        name: fields.asset_name,
        type: fields.asset_type,
        reference: fields.reference === '' || fields.reference === null ? null : fields.reference,
        fakeDirectory: fields.directory,
        version : 1,
        period: fields.period_name === '-1' ? null : fields.period_name,
    }
};

