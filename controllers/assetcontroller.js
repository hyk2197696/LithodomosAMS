/**
 * Controller for asset display
 */
const async = require('async');
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
const queryString = require('query-string');

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
        .populate('propName', Prop)
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
        console.log(result.downloadLink)
        res.download(result.downloadLink, result.fileName);
    });
};

//find all assets
exports.asset_list = (req, res, next) => {
    const parsed = queryString.parse(req.url.split('?')[1]);
    const assetTemplate = getNewAssetTemplate(parsed);

    //const assetTemplate = JSON.parse(req.query.assetTemplate);

    console.log(assetTemplate);
    const method = req.query.method===undefined?1:req.query.method;
    const page = req.query.page===undefined?1:req.query.page;
    let sortBy = {};
    switch(req.query.sortBy===undefined?'name':req.query.sortBy) {
        case 'name':
            sortBy.name = method;
            break;
        case 'type':
            sortBy.type = method;
            break;
        case 'fileType':
            sortBy.fileType = method;
            break;
        case 'lastUpdate':
            sortBy.lastAlterTime = method;
            break;
    }

    console.log('find assets, template:');
    console.log(assetTemplate);
    console.log('sort by: ');
    console.log(sortBy);
    async.parallel({
        assetList: callback => {
            Asset.find(assetTemplate).skip((page - 1) * 10).limit(10).sort(sortBy).exec(callback);
        },
        count: callback => {
            Asset.count(assetTemplate,callback);
        }
    }, (err, results) => {
        if (err) {
            next(err);
        }

        if (results.count === 0) {
            res.render('homepage', {title: 'There are no asset at the moment!'});
        }
        else {

            res.render('assetList', {
                list_asset: results.assetList,
                assetTemplate:queryString.stringify(assetTemplate),
                assetNum: results.count,
                page: page,
                method: method,
                sortBy: req.query.sortBy===undefined?'name':req.query.sortBy
            })
        }
    });

};

exports.history_version_download = (req, res, next) => {
    Asset.findById(req.query.id, (err, result) => {
        if (err) {
            return next(err);
        }
        const location = result.trueLocation + result._id + '_version' + req.query.version;
        console.log(location);
        res.download(location, result.fileName);
    });
};


let getNewAssetTemplate = fields => {
    let assetTemplate = createNewAsset(fields);
    switch (fields.asset_type) {
        case 'Asset':
            break;
        case 'Shader':
            if (fields.shader_type_name != '-1' && fields.shader_type_name != null ) {
                assetTemplate.shaderType = fields.shader_type_name;
            }
            break;
        case 'Diagram':
            if (fields.diagram_type_name != '-1' && fields.diagram_type_name != null) {
                assetTemplate.diagramType = fields.diagram_type_name;
            }
            if (fields.publication_name != '-1' && fields.publication_name != null) {
                assetTemplate.originalPublication = fields.publication_name;
            }
            if (fields.site_name != '' && fields.site_name != null ) {
                assetTemplate.site = fields.site_name;
            }
            break;
        case 'Statue':
            if (fields.statue_type_name != '-1' && fields.statue_type_name != null) {
                assetTemplate.statueType = fields.statue_type_name;
            }
            if (fields.statue_culture_name != '-1' && fields.statue_culture_name != null) {
                assetTemplate.statueCulture = fields.statue_culture_name;
            }
            if (fields.material_name != '-1' && fields.material_name != null) {
                assetTemplate.material = fields.material_name;
            }
            if (fields.pose_name != '' && fields.pose_name != null) {
                assetTemplate.pose = fields.pose_name;
            }
            if (fields.location_name != '' &&  fields.location_name != b) {
                assetTemplate.location = fields.location_name;
            }
            if (fields.gender != 'uncertain' && fields.gender != null) {
                assetTemplate.gender = fields.gender;
            }
            break;
        case 'Architectural Element':
            if (fields.architectural_culture_name != '-1' && fields.architectural_culture_name != null) {
                assetTemplate.architecturalCulture = fields.architectural_culture_name;
            }
            if (fields.architectural_type_name != '-1' && fields.architectural_type_name != null) {
                assetTemplate.architecturalElementType = fields.architectural_type_name;
            }
            if (fields.style_name != '-1' && fields.style_name != null) {
                assetTemplate.style = fields.style_name;
            }
            break;
        case 'Prop':
            if (fields.prop_type != '-1' && fields.prop_type != null) {
                assetTemplate.propType = fields.prop_type;
            }
            if (fields.prop_name != '-1' && fields.prop_name != null) {
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

    if (fields.asset_name != '' && fields.asset_name != null) {
        assetTemplate.name = fields.asset_name;
    }
    if (fields.asset_type != 'Asset' && fields.asset_type != null) {
        assetTemplate.type = fields.asset_type;
    }
    if (fields.reference != '-1' && fields.reference != null) {
        assetTemplate.reference = fields.reference;
    }
    if (fields.directory != '' && fields.directory != null) {
        assetTemplate.fakeDirectory = fields.directory;
    }
    if (fields.period_name != '-1' && fields.period_name != null) {
        assetTemplate.period = fields.period_name;
    }

    return assetTemplate;
};
