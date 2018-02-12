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
const permission = require('../config/permission');
//all request in this page result in a jumping into another page
/* GET catalog home page. */
router.get('/', permission.isLoggedIn, homepage_controller.index);

router.get('/assetsearch', permission.checkSearchPermission, search_controller.search_get);

router.post('/assetsearch', permission.checkSearchPermission, search_controller.search_post);

router.get('/assetfind', permission.checkSearchPermission, directory_controller.find_get);

router.post('/assetfind', permission.checkSearchPermission, directory_controller.find_post);

//router.get('/assetlist', asset_controller.list_get);

router.get('/asset', permission.checkSearchPermission, asset_controller.asset_get);

router.get('/fullassetcreate', permission.checkCreatePermission, create_controller.asset_create_get);

router.post('/fullassetcreate', permission.checkCreatePermission, create_controller.asset_create_post);

router.get('/assetalter', permission.checkUpdatePermission, alter_controller.alter_get);

router.post('/assetalter', permission.checkUpdatePermission, alter_controller.alter_post);

router.get('/assetdelete', permission.checkDeletePermission, delete_controller.delete_get);

router.get('/test', permission.isLoggedIn, homepage_controller.test);

router.get('/success', permission.isLoggedIn, homepage_controller.success_get);

router.post('/test', permission.isLoggedIn, homepage_controller.test_post);

router.get('/typeaheadTest', permission.isLoggedIn, homepage_controller.typeahead_test);

router.get('/assetdownload', permission.checkSearchPermission, asset_controller.asset_download);

router.get('/assetlist', permission.checkSearchPermission, asset_controller.asset_list);

router.get('/historylist', permission.checkSearchPermission, delete_controller.history_list);

router.get('/config', permission.isAdmin, user_controller.config_get);

router.get('/assetrestore', permission.checkCreatePermission, delete_controller.asset_restore);

router.get('/assetshiftdelete', permission.checkDeletePermission, delete_controller.asset_shift_delete);

router.get('/versioncontrol', permission.checkUpdatePermission, alter_controller.version_control_get);

router.post('/changeversion', permission.checkUpdatePermission, alter_controller.version_change);

router.post('/updatefile', permission.checkUpdatePermission, alter_controller.file_update);

//router.post('/versionlist', permission.checkUpdatePermission, alter_controller.version_list);



// route middleware to make sure a user is logged in
module.exports = router;

module.exports = router;