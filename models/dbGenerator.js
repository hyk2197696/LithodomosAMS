/*
 this file is for generating the database schema and some test instances
 It can be run directly using node dbGenerator.js
 */

var async = require('async');
var Project = require('./project');
var Asset = require('./asset');
var FakeDirectory = require('./fakeDirectory');
var Reference = require('./reference');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/lithodomos';

mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'Error!!!'));

var assets = [];
var projects = [];
var fakeDirectories = [];
var references = [];

var projectCreate = (name, cb) => {
    projectDetail = {name: name};
    var project = new Project(projectDetail);

    project.save(
        err => {
            if (err) {
                cb(err, null);
                return;
            }
            console.log('New Porject: ' + project);
            projects.push(project);
            cb(null, project);
        });

};

var referenceCreate = (name, cb) => {
    referenceDetail = {
        name: name
    };
    var reference = new Reference(referenceDetail);

    reference.save(
        err => {
            if (err) {
                cb(err, null);
                return;
            }
            console.log('New Reference: ' + reference);
            references.push(reference);
            cb(null, reference);
        });
};

var fakeDirectoryCreate = (name, superDirectory, cb) => {
    fakeDirectoryDetail = {
        name: name,
    }
    if (superDirectory != null) {
        fakeDirectoryDetail.super = superDirectory;
    } else {
        fakeDirectoryDetail.super = null;
    }

    var fakeDirectory = new FakeDirectory(fakeDirectoryDetail);
    fakeDirectory.save(
        err => {
            if (err) {
                cb(err, null);
                return;
            }
            console.log('New directory: ' + fakeDirectory);
            fakeDirectories.push(fakeDirectory);
            cb(null, fakeDirectory);

        }
    )
};

var assetCreate = (name, project, reference, fakeDirectory, cb) => {
    assetDetail = {
        name: name,
        project: project,
        reference: reference,
        fakeDirectory: fakeDirectory
    }
    var asset = new Asset(assetDetail);
    asset.save(err => {
            if (err) {
                cb(err, null);
                return;
            }
            console.log('New asset ' + asset);
            assets.push(asset);
            cb(null, asset);
        }
    )
};

var generate = (cb) => {
    async.parallel([
            callback => {
                projectCreate('project 1', callback);
            },
            callback => {
                projectCreate('project 2', callback);
            },
            callback => {
                projectCreate('project 3', callback);
            },
            callback => {
                projectCreate('project 4', callback);
            },
            callback => {
                referenceCreate('reference 1', callback);
            },
            callback => {
                referenceCreate('reference 2', callback);
            },
            callback => {
                referenceCreate('reference 3', callback);
            },
            callback => {
                fakeDirectoryCreate('D1_1', null, callback);
            },
            callback => {
                fakeDirectoryCreate('D1_2', null, callback);
            }

        ], cb
    );
};

var createAsset = (cb) => async.parallel([
        callback => {
            assetCreate('asset 1', projects[0], references[0], fakeDirectories[0], callback);
        },
        callback => {
            assetCreate('asset 2', projects[1], references[1], fakeDirectories[1], callback);
        }
    ],
    cb);


async.series([
        generate,
        //createAsset
    ],
    (err, results) => {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        else {
            console.log('Asset: ' + assets);
        }
        //All done, disconnect from database
        mongoose.connection.close();
    });



