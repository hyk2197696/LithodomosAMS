/**
 * Controller for content(different attributes of asset) creation
 */
const con = require('./databasecontroller');
const app = require('../app');
const json = require('json');
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


exports.project_create_get = (req, res, next) => {
    let projectDetail = {name: req.query.name};
    Project.count(projectDetail, (err, projectCount) => {
        if (err) {
            next(err);
        }

        if (projectCount > 0) {
            res.end('Project exists!');
            return;
        }

        //if not exist, create new project
        const newProject = new Project(projectDetail);
        newProject.save(err => {
            if (err) {
                next(err);
            }

            //success
            console.log('insert new project : ');
            console.log(newProject);
            res.end('Project Created successfully!')
        })
    })
};

exports.reference_create_get = (req, res, next) => {
    const referenceDetail = {name: req.query.name};
    Reference.count(referenceDetail, (err, referenceCount) => {
        if (err) {
            next(err);
        }
        if (referenceCount > 0) {
            res.end('Reference exists!');
            return;
        }

        //if not exist, create new reference
        const newReference = new Reference(referenceDetail);
        newReference.save(err => {
            if (err) {
                next(err);
            }
            let resText = {};
            resText.message = 'New reference create successfully!';
            console.log('insert new reference : ');
            console.log(newReference);
            resText.newReference = newReference;
            //success
            res.end(JSON.stringify(resText));
        })
    })
};

exports.period_create_get = (req, res, next) => {
    const periodDetail = {name: req.query.name};
    Period.count(periodDetail, (err, periodCount) => {
        if (err) {
            next(err);
        }
        if (periodCount > 0) {
            res.end('Period exists!');
            return;
        }

        //if not exist, create new period
        const newPeriod = new Period(periodDetail);
        newPeriod.save(err => {
            if (err) {
                next(err);
            }

            //success
            let resText = {};
            resText.message = 'New period create successfully!';
            resText.newPeriod = newPeriod;
            console.log('insert new period : ');
            console.log(newPeriod);
            res.end(JSON.stringify(resText));
        })
    })
};
exports.statue_type_create_get = (req, res, next) => {
    const statueTypeDetail = {name: req.query.name};
    StatueType.count(statueTypeDetail, (err, statueTypeCount) => {
        if (err) {
            next(err);
        }
        if (statueTypeCount > 0) {
            res.end('Statue exists!');
            return;
        }

        //if not exist, create new statue
        const newType = new StatueType(statueTypeDetail);
        newType.save(err => {
            if (err) {
                next(err);
            }

            //success
            const resText = {};
            resText.message = 'New statue type create successfully!';
            resText.newType = newType;
            console.log('insert new statue type : ');
            console.log(newType);
            res.end(JSON.stringify(resText));
        })
    })
};
exports.culture_create_get = (req, res, next) => {
    const cultureDetail = {name: req.query.name};
    Culture.count(cultureDetail, (err, cultureCount) => {
        if (err) {
            next(err);
        }
        if (cultureCount > 0) {
            res.end('Culture exists!');
            return;
        }

        //if not exist, create new culture
        const newCulture = new Culture(cultureDetail);
        newCulture.save(err => {
            if (err) {
                next(err);
            }

            //success
            let resText = {};
            resText.message = 'New culture create successfully!';
            resText.newCulture = newCulture;
            console.log('insert new culture : ');
            console.log(newCulture);
            res.end(JSON.stringify(resText));
        })
    })
};
exports.material_create_get = (req, res, next) => {
    const materialDetail = {name: req.query.name};
    Material.count(materialDetail, (err, materialCount) => {
        if (err) {
            next(err)
        }
        ;
        if (materialCount > 0) {
            res.end('Material exists!');
            return;
        }

        //if not exist, create new material
        const newMaterial = new Material(materialDetail);
        newMaterial.save(err => {
            if (err) {
                next(err);
            }

            //success
            let resText = {};
            resText.message = 'New material create successfully!';
            resText.newMaterial = newMaterial;
            console.log('insert new material : ');
            console.log(newMaterial);
            res.end(JSON.stringify(resText));
        })
    })
};
exports.architectural_type_create_get = (req, res, next) => {
    const architecturalTypeDetail = {name: req.query.name};
    ArchitecturalElementType.count(architecturalTypeDetail, (err, architecturalTypeCount) => {
        if (err) {
            next(err)
        }
        ;
        if (architecturalTypeCount > 0) {
            res.end('Architectural Element Type exists!');
            return;
        }

        //if not exist, create new type
        const newType = new ArchitecturalElementType(architecturalTypeDetail);
        newType.save(err => {
            if (err) {
                next(err);
            }

            //success
            let resText = {};
            resText.message = 'New type create successfully!';
            resText.newArchitecturalElementType = newType;
            console.log('insert new architectural element type : ');
            console.log(newType);
            res.end(JSON.stringify(resText));
        })
    })
};

exports.style_create_get = (req, res, next) => {
    const styleDetail = {name: req.query.name};
    Style.count(styleDetail, (err, styleCount) => {
        if (err) {
            next(err)
        }
        ;
        if (styleCount > 0) {
            res.end('Style exists!');
            return;
        }

        //if not exist, create new Style
        const newStyle = new Style(styleDetail);
        newStyle.save(err => {
            if (err) {
                next(err);
            }

            //success
            let resText = {};
            resText.message = 'New style create successfully!';
            resText.newStyle = newStyle;
            console.log('insert new style : ');
            console.log(newStyle);
            res.end(JSON.stringify(resText));
        })
    })
};
exports.shader_type_create_get = (req, res, next) => {
    const shaderTypeDetail = {name: req.query.name};
    ShaderType.count(shaderTypeDetail, (err, shaderTypeCount) => {
        if (err) {
            next(err)
        }
        ;
        if (shaderTypeCount > 0) {
            res.end('Shader Type exists!');
            return;
        }

        //if not exist, create new shader type
        const newType = new ShaderType(shaderTypeDetail);
        newType.save(err => {
            if (err) {
                next(err);
            }

            //success
            let resText = {};
            resText.message = 'New shader type create successfully!';
            resText.newType = newType;
            console.log('insert new shader type : ');
            console.log(newType);
            res.end(JSON.stringify(resText));
        })
    })
};

exports.diagram_type_create_get = (req, res, next) => {
    const diagramTypeDetail = {name: req.query.name};
    DiagramType.count(diagramTypeDetail, (err, diagramTypeCount) => {
        if (err) {
            next(err)
        }
        ;
        if (diagramTypeCount > 0) {
            res.end('Diagram Type exists!');
            return;
        }

        //if not exist, create new diagram type
        const newType = new DiagramType(diagramTypeDetail);
        newType.save(err => {
            if (err) {
                next(err);
            }

            //success
            let resText = {};
            resText.message = 'New diagram type create successfully!';
            resText.newType = newType;
            console.log('insert new diagram type : ');
            console.log(newType);
            res.end(JSON.stringify(resText));
        })
    })
};

exports.publication_create_get = (req, res, next) => {
    const publicationDetail = {name: req.query.name};
    Publication.count(publicationDetail, (err, publicationCount) => {
        if (err) {
            next(err);
        }
        if (publicationCount > 0) {
            res.end('Publication exists!');
            return;
        }

        //if not exist, create new Publication
        const newPublication = new Publication(publicationDetail);
        newPublication.save(err => {
            if (err) {
                next(err);
            }

            //success
            let resText = {};
            resText.message = 'New Publication create successfully!';
            resText.newPublication = newPublication;
            console.log('insert new publication : ');
            console.log(newPublication);
            res.end(JSON.stringify(resText));
        })
    })
};
