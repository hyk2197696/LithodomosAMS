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

//all request in this file aim for exchange data dynamically, without any page redirection

//select/get
router.get('/selectproject',create_controller.select_project);

router.get('/selectallproject',create_controller.select_all_project);

router.get('/selectallsite',create_controller.select_all_site);

router.get('/selectallreference',create_controller.select_all_reference);

router.get('/selectalldirectory',directory_controller.select_all_directory);

router.get('/getfullfolderdirectory',directory_controller.get_full_folder_directory);

//check
router.get('/checkfolderexistance',directory_controller.check_folder_existance);


//create content
router.get('/projectcreate', content_controller.project_create_get);

router.get('/referencecreate', content_controller.reference_create_get);

router.get('/periodcreate', content_controller.period_create_get);

router.get('/statuetypecreate', content_controller.statue_type_create_get);

router.get('/culturecreate', content_controller.culture_create_get);

router.get('/materialcreate', content_controller.material_create_get);

router.get('/architecturaltypecreate', content_controller.architectural_type_create_get);

router.get('/stylecreate', content_controller.style_create_get);

router.get('/shadertypecreate', content_controller.shader_type_create_get);

router.get('/diagramtypecreate', content_controller.diagram_type_create_get);

router.get('/publicationcreate', content_controller.publication_create_get);

module.exports = router;