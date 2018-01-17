/**
 * Controller for asset search
 */
const async = require('async');
const formidable = require('formidable');
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
const Prop = require('../models/prop');

//get method for asset search, getting all the information needed for rendering the page
exports.search_get = (req, res, next) => {
    async.parallel({
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

        res.render('assetSearch',
            {
                title: 'Search for Asset',
                reference_list: result.reference_list,
                shader_type_list: result.shader_type_list,
                period_list: result.period_list,
                diagram_type_list: result.diagram_type_list,
                publication_list: result.publication_list,
                prop_name_list: [], //to be added
                statue_type_list: result.statue_type_list,
                culture_list: result.culture_list,
                material_list: result.material_list,
                architectural_type_list: result.architectural_type_list,
                style_list: result.style_list,
                prop_list: result.prop_list

            });
    });
};


// Handle Asset search on POST
exports.search_post = (req, res, next) => {
    let form = new formidable.IncomingForm();
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

            if (results.projectId != null) {
                assetTemplate.project = results.projectId;
            }
            console.log("Search for assets : ");
            console.log(fields);
            console.log(assetTemplate);
            //find all satisfying assets, sort by asset name
            return res.redirect('/catalog/assetlist?page=1&sortBy=name&method=1&assetTemplate=' + encodeURI(JSON.stringify(assetTemplate)));

        })
    });
};

//generate the asset template for asset search
let getNewAssetTemplate = fields => {
    let assetTemplate = createNewAsset(fields);
    switch (fields.asset_type) {
        case 'Asset':
            break;
        case 'Shader':
            if (fields.shader_type_name != '-1') {
                assetTemplate.shaderType = fields.shader_type_name;
            }
            break;
        case 'Diagram':
            if (fields.diagram_type_name != '-1') {
                assetTemplate.diagramType = fields.diagram_type_name;
            }
            if (fields.publication_name != '-1') {
                assetTemplate.originalPublication = fields.publication_name;
            }
            if (fields.site_name != '') {
                assetTemplate.site = fields.site_name;
            }
            break;
        case 'Statue':
            if (fields.statue_type_name != '-1') {
                assetTemplate.statueType = fields.statue_type_name;
            }
            if (fields.statue_culture_name != '-1') {
                assetTemplate.statueCulture = fields.statue_culture_name;
            }
            if (fields.material_name != '-1') {
                assetTemplate.material = fields.material_name;
            }
            if (fields.pose_name != '') {
                assetTemplate.pose = fields.pose_name;
            }
            if (fields.location_name != '') {
                assetTemplate.location = fields.location_name;
            }
            if (fields.gender != 'uncertain') {
                assetTemplate.gender = fields.gender;
            }
            break;
        case 'Architectural Element':
            if (fields.architectural_culture_name != '-1') {
                assetTemplate.architecturalCulture = fields.architectural_culture_name;
            }
            if (fields.architectural_type_name != '-1') {
                assetTemplate.architecturalElementType = fields.architectural_type_name;
            }
            if (fields.style_name != '-1') {
                assetTemplate.style = fields.style_name;
            }
            break;
        case 'Prop':
            assetTemplate.propType = fields.prop_type;
            if (fields.prop_name != '-1'){
                assetTemplate.propName = fields.prop_name;
            }
            break;
    }
    return assetTemplate;
};

//create a new asset template based on the request
let createNewAsset = fields => {
    let assetTemplate = {};

    assetTemplate.valid=true;

    if (fields.asset_name != '') {
        assetTemplate.name = fields.asset_name;
    }
    if (fields.asset_type != 'Asset') {
        assetTemplate.type = fields.asset_type;
    }
    if (fields.reference != '-1') {
        assetTemplate.reference = fields.reference;
    }
    if (fields.directory != '') {
        assetTemplate.fakeDirectory = fields.directory;
    }
    if (fields.period_name != '-1') {
        assetTemplate.period = fields.period_name;
    }

    return assetTemplate;
};
