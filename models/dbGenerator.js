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



var assetCreate = (name, cb) => {
    let assetTemplate = {
        name: name,
        fakeDirectory: '5a42cc65c506b50dcc52b18d',
        period:'5a4af8a7ba7beb1e7c623335',
        project:'5a42cc65c506b50dcc52b189',
        fileName: 'interviewforjoao.txt',
        fileType: '.txt',
        trueLocation: 'C:/Users/Render4/WebstormProjects/LithodomosAMS/./file/a/7/',
        createTime: Date.now(),
        valid: true,
        type: 'Asset',
        version: 1
        };

    var newHistory = {
        name: 'name1',
        version: 1,
        activated: true,
        fileName:'filename',
        description: 'First uploaded version',
        updateTime: Date.now(),
        updatedBy: 'Bernardo'
    };
    assetTemplate.history = [];
    assetTemplate.history.push(newHistory);

    var asset = new Asset(assetTemplate);
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

var generate1 = (cb) => {
    async.parallel([
        cb => assetCreate('name1',cb),
        cb => assetCreate('name1',cb),
        cb => assetCreate('name1',cb),
        cb => assetCreate('name1',cb),
        cb => assetCreate('name1',cb),
        cb => assetCreate('name1',cb),
        cb => assetCreate('name1',cb),
        cb => assetCreate('name1',cb),
        cb => assetCreate('name1',cb),
        cb => assetCreate('name1',cb),
        ], cb
    );
};

var generate2 = (cb) => {
    async.parallel([
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),
            cb => generate1(cb),

        ], cb
    );
};
var generate = (cb) => {
    async.parallel([
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),
            cb => generate2(cb),

        ], cb
    );
};
// var createAsset = (cb) => async.parallel([
//         callback => {
//             assetCreate('asset 1', projects[0], references[0], fakeDirectories[0], callback);
//         },
//         callback => {
//             assetCreate('asset 2', projects[1], references[1], fakeDirectories[1], callback);
//         }
//     ],
//     cb);


async.parallel([
        cb => generate(cb),
        cb => generate(cb),
        cb => generate(cb),
        cb => generate(cb),
        cb => generate(cb),
        cb => generate(cb),
        cb => generate(cb),
        cb => generate(cb),
        cb => generate(cb),
        cb => generate(cb),

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



