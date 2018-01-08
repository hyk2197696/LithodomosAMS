/**
 * Controller for database operation
 */
const json = require('json');
const Asset = require('../models/asset');
const Project = require('../models/project');

//find the project which (partially) contains the name
//not used at the moment
const find_all_project_from_db = callback => {
    Project.find()
        .exec((err, project_list) => {
            if (err) {
                return next(err);
            }
            //console.log(project_list);
            callback(project_list)
        })
};

exports.select_project = (req, res) => {

    find_project_from_db(req.query.name, function (results) {
        res.end(JSON.stringify(results));
    });


};

//select all the project for typeahead of project field
exports.select_all_project = (req, res) => {
    find_all_project_from_db(results => {
        res.end(JSON.stringify(results));
    });
};

//get all distinct sites
exports.select_all_site = (req, res) => {
    Asset.find({valid:true}).distinct('site').exec((err, results) => {
        console.log(results);
        res.end(JSON.stringify(results));
    })
};

//get all asset name
exports.get_all_asset_name = (req, res) => {
    Asset.find({valid:true}).distinct('name').exec((err, results) => {
        // console.log('name:')
        // console.log(results);
        res.end(JSON.stringify(results));
    })
};

//select all the reference for selection menu
//not used at the moment
exports.select_all_reference = (req, res) => {
    find_all_reference_from_db(results => {
        res.end(results);
    });
};
