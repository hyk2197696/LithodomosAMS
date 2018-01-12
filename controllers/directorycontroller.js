/**
 * Controller for fake directory
 */
const async = require('async');
const app = require('../app');
const json = require('json');
const FakeDirectory = require('../models/fakeDirectory');
const Asset = require('../models/asset');

//get method for asset find(directory explore)
//basically first find all folders in root directory.(asset can't be stored in root directory)
//then find all subdirectory by the super attribute, which is all the subdirectory of a specific folder
//find asset by the attribute of fakeDirectory at the same time
//display all the folders and assets in a specific
exports.find_get = (req, res, next) => {
    let folderDetail = {};
    let assetDetail = {};
    assetDetail.valid = true;
    if (req.query.id != 'null') {
        folderDetail.super = req.query.id;
        assetDetail.fakeDirectory = req.query.id;
    } else {
        folderDetail.super = null;
        assetDetail.fakeDirectory = null;

    }


    async.parallel({
        folder_list: callback => {
            FakeDirectory.find(folderDetail)
                .exec(callback);
        },
        asset_list: callback => {
            Asset.find(assetDetail)
                .exec(callback);
        }
    }, (err, results) => {
        if (err) {
            return next(err);
        }

        res.render('assetFind', {
            user: req.user,
            title: 'Find an Asset',
            folder_list: results.folder_list,
            asset_list: results.asset_list,
            folderId: req.query.id.toString()
        });
    });

};

exports.find_post = (req, res, next) => {
    res.render('searchForm', {title: 'Search Asset'});
};


exports.check_folder_existance = (req, res, next) => {
    let folderDetail = {
        name: req.query.name
    };
    if (req.query.id != 'null') {
        folderDetail.super = req.query.id;
    } else {
        folderDetail.super = null;
    }
    FakeDirectory.count(folderDetail, (err, count) => {
        if (err) {
            return next(err);
        }
        if (count == '0') {
            newFolder = new FakeDirectory(folderDetail);
            newFolder.save(err => {
                if (err) {
                    return next(err);
                }
                res.end('success');
            })
        } else {
            res.end('Folder exist!');
        }
    });

};


exports.select_all_directory = (req, res, next) => {
    FakeDirectory.find().exec(
        (err, results) => {
            if (err) {
                return next(err);
            }
            //console.log(results);
            res.end(JSON.stringify(results));
        }
    )
};

const folder_Directory = (id, subDirectory, allDirectories, callback) => {
    const thisFolder = allDirectories.filter(item => {
        return item.id == id;
    });
    if (thisFolder.length == 0) {
        return subDirectory;
    }
    thisDirectory = '/' + thisFolder[0].name + subDirectory;
    if (thisFolder[0].super != null) {
        folder_Directory(thisFolder[0].super, thisDirectory, allDirectories, callback);
    } else {
        callback(thisDirectory);
    }
};

exports.get_full_folder_directory = (req, res, next) => {
    FakeDirectory.find().exec(
        (err, results) => {
            if (err) {
                return next(err);
            }
            folder_Directory(req.query.id, '/', results, fullDirectory => {
                console.log('id = ' + req.query.id);
                res.end(fullDirectory);
            })
        }
    )
};
