var express = require('express');
var router = express.Router();
var app = require('../app.js');
var homepage_controller = require('../controllers/homepagecontroller');
var search_controller = require('../controllers/assetsearchcontroller');
var create_controller = require('../controllers/assetcreatecontroller');
var alter_controller = require('../controllers/assetaltercontroller');
var delete_controller = require('../controllers/assetdeletecontroller');
var asset_controller = require('../controllers/assetcontroller');
var content_controller = require('../controllers/contentcreatecontroller');
var directory_controller = require('../controllers/directorycontroller');

router.get('/selectproject',create_controller.select_project);

router.get('/selectallproject',create_controller.select_all_project);

router.get('/selectallreference',create_controller.select_all_reference);

router.get('/checkfolderexistance',directory_controller.check_folder_existance);

router.get('/getfullfolderdirectory',directory_controller.get_full_folder_directory);

module.exports = router;