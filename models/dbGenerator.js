var async = require('async');
var Project = require('./project');
var Asset = require('./asset');
var Fakedirectory = require('./fakeDirectory');
var Reference = require('./reference');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://hyk:hyk219769696@ds133166.mlab.com:33166/lithodomos';

mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error',console.error.bind(console,'Error!!!'));

var assets = [];
var projects = [];
var fakeDirectories = [];
var reference = [];

function projectCreate(name,cb){
    projectDetail = {name:name};
    var project = new Project(projectDetail);

    project.save(
        err => {
            if(err) {
                cb(err, null);
                return;
            }
            consoole.log('New Porject: ' + project);
            projects.push(project);
            cb(null, project);
    });
};

function referenceCreate(name,cb){
    referenceDetail = {name:name};
    var reference = new Reference(referenceDetail);

    project.save(
        err => {
            if(err) {
                cb(err, null);
                return;
            }
            consoole.log('New Reference: ' + reference);
            references.push(reference);
            cb(null, reference);
        });
};

function fakeDirectoryCreate(name, superDirectory, cb){
    fakeDirectoryDetail = {
        name: name,
    }
    if(superDirectory != null){
        fakeDirectory.super = superDirectory;
    }else{
        fakeDirectory.super = null;
    }

    var fakeDirectory = new FakeDirectory(fakeDirectoryDetail);
    fakeDirectory.save(
        err => {
            if(err){
                cb(err,null);
                return;
            }
            console.log('New directory: ' + fakeDirectory);
            fakeDirectories.push(fakeDirectory);
            cb(null,book);

        }
    )
};

var assetCreate =  (name, project, reference, fakeDirectory, cb) => {
    assetDetail = {
        name: name,
        project: project,
        reference: reference,
        fakeDirectory:fakeDirectory
    }
    var asset = new Asset(assetDetail);
    asset.save(err => {
        if(err){
            cb(err, null);
            return;
        }
        console.log('New asset ' + asset);
        assets.push(asset);
        cb(null, asset);
        }
    )
};

var generate = () => {
    async.parallel([
        callback => {
            projectCreate('project 1',callback);
        },
        callback => {
            projectCreate('project 2',callback);
        },
        callback => {
            projectCreate('project 3',callback);
        },
        callback => {
            projectCreate('project 4',callback);
        },
        callback => {
            referenceCreate('reference 1',callback);
        },
        callback => {
            referenceCreate('reference 2',callback);
        },
        callback => {
            referenceCreate('reference 3',callback);
        },
        callback => {
            fakeDirectoryCreate('D1_1',null,callback);
        },
        callback => {
            fakeDirectoryCreate('D1_1', null, callback);
        }

    ],(err, results) => {
        if(err){
            console.err('Error occurs');
        }else{
            console.log('Create successfully');
        }
        mongoose.connection.close();
    });
};

