const express = require('express');
var router = express.Router();
const app = require('../app.js');
const homepage_controller = require('../controllers/homepagecontroller');
const search_controller = require('../controllers/assetsearchcontroller');
const create_controller = require('../controllers/assetcreatecontroller');
const alter_controller = require('../controllers/assetaltercontroller');
const delete_controller = require('../controllers/assetdeletecontroller');
const asset_controller = require('../controllers/assetcontroller');
const content_controller = require('../controllers/contentcreatecontroller');
const directory_controller = require('../controllers/directorycontroller');
const user_controller = require('../controllers/user_controller');
//all request in this page result in a jumping into another page
/* GET catalog home page. */
router.get('/', isLoggedIn, homepage_controller.index);

router.get('/assetsearch', isLoggedIn, search_controller.search_get);

router.post('/assetsearch', isLoggedIn, search_controller.search_post);

router.get('/assetfind', isLoggedIn, directory_controller.find_get);

router.post('/assetfind', isLoggedIn, directory_controller.find_post);

//router.get('/assetlist', asset_controller.list_get);

router.get('/asset', isLoggedIn, asset_controller.asset_get);

router.get('/assetcreate', isLoggedIn, create_controller.create_get);

router.post('/assetcreate', isLoggedIn, create_controller.create_post);

router.get('/fullassetcreate', isLoggedIn, create_controller.asset_create_get);

router.post('/fullassetcreate', isLoggedIn, create_controller.asset_create_post);

router.get('/assetalter', isLoggedIn, alter_controller.alter_get);

router.post('/assetalter', isLoggedIn, alter_controller.alter_post);

router.get('/assetdelete', isLoggedIn, delete_controller.delete_get);

router.get('/test', isLoggedIn, homepage_controller.test);

router.get('/success', isLoggedIn, homepage_controller.success_get);

router.post('/test', checkPermission, homepage_controller.test_post);

router.get('/typeaheadTest', isLoggedIn, homepage_controller.typeahead_test);

router.get('/assetdownload', isLoggedIn, asset_controller.asset_download);

router.get('/assetlist', isLoggedIn, asset_controller.asset_list);

router.get('/config', isAdmin, user_controller.config_get);
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

function checkPermission(req,res,next)  {
    if(req.isAuthenticated()){
        if (req.user.permission.indexOf('delete') !== -1){
            return next();
        }
        else{
            res.render('homepage',{title:'You don\'t have permission to do that'});
        }
    }
    res.redirect('/');
    //console.log(req)
}
function isAdmin(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.role === 'admin'){
            return next();
        }
        else{
            res.render('homepage',{title:'Only admin user can access that!'});

        }
    }
    res.redirect('/');
}

module.exports = router;

module.exports = router;