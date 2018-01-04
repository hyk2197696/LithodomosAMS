/**
 * Controller for asset deletion
 */
var con = require('./databasecontroller');
var app = require('../app');
var Asset = require('../models/asset');

//get method for asset deletion delete the asset by id (collection.findByIdAndRemove())
exports.delete_get = (req, res, next) => {
    Asset.findByIdAndRemove(req.query.id, err => {
        if (err) {
            return next(err);
        }
        Asset.count((err, countAsset) => {
            if (err) {
                return next(err);
            }
            res.render('homepage', {title: 'Asset Delete successfully', assetnum: countAsset});
        });
    });
}