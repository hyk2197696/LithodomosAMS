var express = require('express');
var router = express.Router();
var database_controller = require('../controllers/databasecontroller');
var asset_controller = require('../controllers/assetcontroller');
var content_controller = require('../controllers/contentcreatecontroller');
var directory_controller = require('../controllers/directorycontroller');
const user_controller = require('../controllers/user_controller');
const permission = require('../config/permission');
//all request in this file aim for exchange data dynamically, without any page redirection

//select/get
router.get('/selectproject', permission.checkSearchPermission, database_controller.select_project);

router.get('/selectallproject', permission.checkSearchPermission, database_controller.select_all_project);

router.get('/selectallsite', permission.checkSearchPermission, database_controller.select_all_site);

router.get('/selectallreference', permission.checkSearchPermission, database_controller.select_all_reference);

router.get('/selectalldirectory', permission.checkSearchPermission, directory_controller.select_all_directory);

router.get('/getfullfolderdirectory', permission.checkSearchPermission, directory_controller.get_full_folder_directory);

router.get('/selectallassetname', permission.checkSearchPermission, database_controller.get_all_asset_name);

router.get('/getuser', permission.isLoggedIn, (req,res)=>{res.end(JSON.stringify(req.user))});

//check
router.get('/checkfolderexistance', permission.checkSearchPermission, directory_controller.check_folder_existance);

//change user permission
router.get('/changepermission', permission.isAdmin, user_controller.change_permission);

router.get('/deleteuser', permission.isAdmin, user_controller.delete_user);

//create content
router.get('/projectcreate', permission.checkCreatePermission, content_controller.project_create_get);

router.get('/periodcreate', permission.checkCreatePermission, content_controller.period_create_get);

router.get('/statuetypecreate', permission.checkCreatePermission, content_controller.statue_type_create_get);

router.get('/culturecreate', permission.checkCreatePermission, content_controller.culture_create_get);

router.get('/materialcreate', permission.checkCreatePermission, content_controller.material_create_get);

router.get('/architecturaltypecreate', permission.checkCreatePermission, content_controller.architectural_type_create_get);

router.get('/stylecreate', permission.checkCreatePermission, content_controller.style_create_get);

router.get('/shadertypecreate', permission.checkCreatePermission, content_controller.shader_type_create_get);

router.get('/diagramtypecreate', permission.checkCreatePermission, content_controller.diagram_type_create_get);

router.get('/publicationcreate', permission.checkCreatePermission, content_controller.publication_create_get);

router.get('/propcreate', permission.checkCreatePermission, content_controller.prop_create_get);


//download
router.get('/historydownload', permission.checkSearchPermission, asset_controller.history_version_download);

router.get('/deletefolder', permission.checkDeletePermission, directory_controller.delete_folder);

module.exports = router;

