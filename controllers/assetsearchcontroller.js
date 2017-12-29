/**
 * Controller for asset search
 */
var con = require('./databasecontroller');
var app = require('../app');
var json = require('json');
var Asset = require('../models/asset');


//get method for asset search
exports.search_get = function(req, res, next) {
    res.render('searchForm', { title: 'Search Asset' });
};

exports.full_search_get = function(req, res, next) {
    res.render('assetSearch', { title: 'Search Asset' });
};



// Handle Asset search on POST
exports.search_post = function(req, res, next) {

    //Check that the id field is not empty
    //req.checkBody('name', 'ID required').notEmpty();

    //Trim and escape the name field.
    req.sanitize('name').escape();
    req.sanitize('name').trim();

    //Run the validators
    var errors = req.validationErrors();



    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('searchForm', { title: 'Search Asset', id:req.body.id, errors: errors});
        return;
    }
    else {
        //if there are no errors search the database and return the result, render the asset list page
        Asset.find( {name: ({$regex:req.body.name})} )
            .exec( (err, list_asset) => {
                if (err)  {return next(err);}
                if(list_asset.length == 0) {
                                     res.render('success', {title: 'empty', massage: 'empty!'});
                                 }
                                 else {
                                     console.log(list_asset);
                                     res.render('assetList', { list_asset : list_asset})
                                 }
            })
     }

};
//