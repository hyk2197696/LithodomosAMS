/**
 * Controller for asset deletion
 */
const con = require('./databasecontroller');
const app = require('../app');
const Asset = require('../models/asset');
const fs = require('fs');
const async = require('async');
//get method for asset deletion delete the asset by id (collection.findByIdAndRemove())
exports.delete_get = (req, res, next) => {

    Asset.findByIdAndUpdate(req.query.id, {'valid':false, deletedTime: Date.now(), deletedBy: req.user.email},  (err,result) => {
        if (err) {
            return next(err);
        }
        console.log(result.trueLocation);
        fs.unlinkSync(result.trueLocation);
        console.log('file deleted');
        Asset.count((err, countAsset) => {
            if (err) {
                return next(err);
            }
            res.render('homepage', {title: 'Asset Delete successfully', assetnum: countAsset});
        });
    });
};

exports.history_list = (req, res, next ) => {
    const method = req.query.method===undefined?1:req.query.method;
    const page = req.query.page===undefined?1:req.query.page;
    const sortBy = {};
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
        case 'deletedTime':
            sortBy.deletedTime = method;
            break;
        case 'deletedBy' :
            sortBy.deletedBy = method;
    }

    console.log('find histories :');
    async.parallel({
        assetList: callback => {
            Asset.find({valid:false}).skip((page - 1) * 10).limit(10).sort(sortBy).exec(callback);
        },
        count : callback => {
            Asset.count({valid:false},callback);
        }
    }, (err, results) => {
        if(err) {
            next(err);
        }
        if (results.count === 0) {
            res.render('homepage', {title: 'There are no history at the moment!'});
        }
        else {

            res.render('historyList', {
                list_asset: results.assetList,
                assetNum: results.count,
                page: page,
                method: method,
                sortBy: req.query.sortBy===undefined?'name':req.query.sortBy
            })
        }

    })

}