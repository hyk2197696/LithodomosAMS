const Asset = require('../models/asset');
//index page


exports.index = (req, res, next) => {
    console.log(req.user);
    Asset.count({'valid': true}, (err, countAsset) => {
        if (err) {
            return next(err);
        }

        res.render('homepage', {user : req.user, title: 'Welcome to Lithodomos Asset Management System', assetNum: countAsset});
    });
};


//all of the following is for testing
exports.test = (req, res, next) => {
    res.render('test', {});
};

exports.test_post = function (req, res, next) {
    res.redirect('/')

};
exports.typeahead_test = (req, res) => {
    res.render('typeaheadTest', {title: 'Lithodomos Asset Management System'});
};


exports.check_folder_existance = function (req, res, next) {
    console.log("success");
    res.end('success');
};

exports.success_get = function (req, res, next) {
    res.render('success', {title: 'Lithodomos Asset Management System'});
};
