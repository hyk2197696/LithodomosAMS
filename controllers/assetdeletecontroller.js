/**
 * Controller for asset deletion
 */
const con = require('./databasecontroller');
const app = require('../app');
const Asset = require('../models/asset');
const fs = require('fs')
//get method for asset deletion delete the asset by id (collection.findByIdAndRemove())
exports.delete_get = (req, res, next) => {

    Asset.findByIdAndUpdate(req.query.id, {'valid':false, deletedTime: Date.now()},  (err,result) => {
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