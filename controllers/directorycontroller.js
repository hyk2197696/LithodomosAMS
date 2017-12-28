/**
 * Controller for fake directory
 */

var con = require('./databasecontroller');
var async = require('async');
var app = require('../app');
var json = require('json');
var FakeDirectory = require('../models/fakeDirectory');
var Asset = require('../models/asset');

//get method for asset find(directory explore)
//basically first find all folders in root directory.(asset can't be stored in root directory)
//then find all subdirectory by the super attribute, which is all the subdirectory of a specific folder
//find asset by the attribute of fakeDirectory at the same time
//display all the folders and assets in a specific
exports.find_get = function (req, res, next) {
    var folderDetail = {};
    var assetDetail = {};
    if (req.query.id != 'null') {
        folderDetail.super = req.query.id;
        assetDetail.fakeDirectory = req.query.id;
    } else {
        folderDetail.super = null;
        assetDetail.fakeDirectory = null;
    }


    async.parallel({
        folder_list: callback => {
            FakeDirectory.find(folderDetail)
                .exec(callback);
        },
        asset_list: callback => {
            Asset.find(assetDetail)
                .exec(callback);
        }
    }, (err, results) => {
        if (err) {
            return next(err);
        }

        res.render('assetFind', {
            title: 'Find an Asset',
            folder_list: results.folder_list,
            asset_list: results.asset_list,
            folderId: req.query.id.toString()
        });
    });

};

exports.find_post = function (req, res, next) {
    res.render('searchForm', {title: 'Search Asset'});
};


exports.check_folder_existance = function (req, res, next) {
    var folderDetail = {
        name: req.query.name
    };
    if(req.query.id != 'null'){
        folderDetail.super = req.query.id ;
    }else{
        folderDetail.super = null;
    }
    FakeDirectory.count(folderDetail, (err, count) => {
        if(err) {return next(err);}
        if(count == '0'){
            newFolder = new FakeDirectory(folderDetail);
            newFolder.save(err =>{
                if(err) {return next(err);}
                res.end('success');
            })
        }else{
            res.end('Folder exist!');
        }
    });

};

function get_folder_info(id, call_back, html_res) {
    var sql = 'select name,ifnull(super,\'null\') as super from sys.fakedirectory where idfakedirectory = ' + id;
    console.log('new query :' + sql);
    var query = con.query(sql);
    var name, super_id;
    query.on('result', function (row) {
        name = row.name.toString();
        super_id = row.super.toString();
    });
    query.on('end', function () {
        call_back(name, super_id, html_res);
    });
};

function on_get_folder_info(name, super_id, html_res) {
    directory = name + '/' + directory;
    console.log('directory inside = ' + directory);
    id = super_id;
    if (id != 'null') {

    }
}

exports.select_all_directory = (req, res, next) => {
    FakeDirectory.find().exec(
        (err,results) => {
            if (err) {return next(err);}
            //console.log(results);
            res.end(JSON.stringify(results));
        }
    )
};

var folder_Directory = (id ,subDirectory, allDirectories, callback) => {
    var thisFolder = allDirectories.filter( item => {
        return item.id == id;
    });
    if(thisFolder.length == 0){
        return subDirectory;
    }
    thisDirectory =  '/' + thisFolder[0].name  + subDirectory;
    if(thisFolder[0].super != null){
        folder_Directory(thisFolder[0].super, thisDirectory, allDirectories,callback);
    }else{
        callback(thisDirectory);
    }
};

exports.get_full_folder_directory = function (req, res, next) {
    FakeDirectory.find().exec(
        (err,results) => {
            if (err) {return next(err);}
            folder_Directory(req.query.id, '/', results , fullDirectory => {
                console.log('id = ' + req.query.id);
                res.end(fullDirectory);
            })
        }
    )
    // var directory = '';
    // var id = req.query.id;
    // var sql = 'select name, ifnull(super,\'null\'\) as super from sys.fakedirectory where idfakedirectory =' + req.query.id;
    // console.log("new query" + sql);
    // var query = con.query(sql);
    //
    // query.on('result', function (row) {
    //     console.log(row);
    //     directory = row.name.toString();
    //     id = row.super.toString();
    // });
    // query.on('end', function () {
    //     // console.log('directory before = ' + directory);
    //     //
    //     // get_folder_info(id, function(name, super_id){
    //     //     directory = name + '/' + directory;
    //     //     console.log('directory inside = ' + directory);
    //     //     id = super_id;
    //     // });
    //     get_folder_info(id, on_get_resonpse);
    //
    //     res.end(directory);
    //     console.log('directory after = ' + directory);
    //
    // });
};

// while(id != 'null'){
//     sql = 'select name,ifnull(super,\'null\') as super from sys.fakedirectory where idfakedirectory = '+ id;
//     console.log('new query :' + sql);
//     con.query(sql).on('result', function(){
//         directory = row.name.toString() + '/' + directory;
//         id = row.super.toString();
//     })
//
//
// }
// res.end(directory);
// ;


//
// console.log('directory before = ' + directory);
//
// // get_folder_info is called synchronously, but the 2nd argument here is a callback function
// // this callback function is called via the query 'end' event listener
// // event listeners are asynchronous, and as we don't know how the query 'end' event is handled internally,
// // we can't guarantee execution order. this means we need to shuffle our code a bit to get the desired result.
// // basically, think of your current code execution as...
// // get_folder_info call -> res.end -> get_folder_info calls call_back when query finally fires 'end'
// get_folder_info(id, function(name, super_id) {
//     directory = name + '/' + directory;
//     console.log('directory inside = ' + directory);
//     id = super_id;
// });
//
// res.end(directory);
//
// console.log('directory after = ' + directory);qq
//
// function get_folder_info(id, call_back) {
//     var sql =
//         "select name,ifnull(super,'null') as super from sys.fakedirectory where idfakedirectory = " +
//         id;
//
//     console.log('new query :' + sql);
//
//     var query = con.query(sql);
//     var name, super_id;
//
//     query.on('result', function(row) {
//         name = row.name.toString();
//         super_id = row.super.toString();
//     });
//
//     query.on('end', function() {
//         call_back(name, super_id);
//     });
// }
//
// // fixed order
// // you can see that res.end and the console.log have been shifted to the end of the callback function
// // this is so that get_folder_info will execute, then finally when the query 'end' event fires
// // at an undetermined time due to it's asynchronous nature, your response will be closed _afterwards_
// console.log('before');
//
// get_folder_info(id, function(name, superId) {
//
//     // ...
//
//     res.end(directory);
//
//     console.log('after');
// });
//
//
// function get_folder_info(id, call_back) {
//     // ...
//  }