/**
 * Controller for asset deletion
 */
const Asset = require('../models/asset');
const fs = require('fs');
const async = require('async');

//get method for asset deletion delete the asset by id (collection.findByIdAndRemove())
exports.delete_get = (req, res, next) => {
    //for the deletion, set the valid attribute to false and record delete time and delete user
    //do not delete files now for future restore
    Asset.findByIdAndUpdate(req.query.id, {'valid':false, deletedTime: Date.now(), deletedBy: req.user.email},  (err,result) => {
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
};

//shift delete is for permanently delete the asset and files
exports.asset_shift_delete = (req, res, next) => {

    Asset.findByIdAndRemove(req.query.id ,  (err,result) => {
        if (err) {
            return next(err);
        }
        console.log('asset deleted:');
        console.log(result);
        for(let i = 0; i < result.history.length; i++){
            let location = result.trueLocation + result.history[i].name;
            console.log(location);
            fs.unlinkSync(location);
        }


        Asset.count((err, countAsset) => {
            if (err) {
                return next(err);
            }
            res.render('homepage', {title: 'Asset Delete successfully', assetnum: countAsset});
        });
    });
};

//restore the deleted asset
exports.asset_restore = (req, res, next) => {
    Asset.findByIdAndUpdate(req.query.id, {'valid':true, deletedTime: null, deletedBy: null},  (err,result) => {
        if (err) {
            return next(err);
        }
        res.redirect('/catalog/asset?id=' + req.query.id);
    });
};

//method for getting the deleted history list
exports.history_list = (req, res, next ) => {
    //for sorting and pagination
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

};