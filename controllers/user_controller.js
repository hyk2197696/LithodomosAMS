/**
 * Controller for user controller
 */
const User = require('../models/user');
const async = require('async');

//get method for user config page
exports.config_get = (req, res, next)=> {
    const page = req.query.page;
    const sortBy = {};
    sortBy.email = req.query.order;
    async.parallel({
        userList: callback => {
            User.find().skip((page - 1) * 10).limit(10).sort(sortBy).exec(callback);
        },
        count: callback => {
            User.count(callback);
        }
    }, (err, results) => {
        if (err) {
            next(err);
        }
        res.render('userConfig',{
            userList: results.userList,
            userNum: results.count,
            page: page,
            order: req.query.order
        });
    })
};

//handling the change permission request
exports.change_permission = (req, res, next) => {
    console.log(req.query.id);
    const permissionList = req.query.permission.split(',');
    const newPermission = {};
    newPermission.permission = permissionList;

    console.log(newPermission);
    User.findByIdAndUpdate(req.query.id,newPermission, err => {
        if(err) return next(err);
        res.end('success');
    })
};

//handling the user delete request
exports.delete_user = ( req, res, next) => {
    console.log('delete user: ' + req.query.id);
    User.findByIdAndRemove(req.query.id, err => {
        if(err) next(err);
        res.end('success');
    })
};