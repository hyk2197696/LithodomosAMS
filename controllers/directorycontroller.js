/**
 * Controller for fake directory
 */

var con = require('./databasecontroller')
var app = require('../app')
var json = require('json')




exports.find_get = function(req, res, next) {
    var sql = 'select * from sys.fakedirectory where super';

    if(req.query.id == 0){
        sql += ' is null';
    }else{
        sql += '=' + req.query.id;
    }
    console.log('new query: ' +  sql);
    var query_folder = con.query(sql);
    var folder_list = [];
    var asset_list = [];
    query_folder.on('result',function(row){
        console.log(row);
        folder_list.push(row);
    })
    query_folder.on('end',function(){
        sql = 'select * from sys.asset where location = ';
        if(req.query.id == 0){
            sql += '1';
        }else{
            sql +=  req.query.id;
        }
        console.log('new query: ' + sql);
        var query_asset = con.query(sql);
        query_asset.on('result', function(row){
            console.log(row);
            asset_list.push(row);
        })

        query_asset.on('end',function(){
            res.render('assetFind', { title: 'Find an Asset', folder_list:folder_list, asset_list:asset_list,folderid:req.query.id});
        });

    })


};

exports.find_post =  function(req, res, next) {
    res.render('searchForm', { title: 'Search Asset' });
};



exports.check_folder_existance = function (req, res, next ){
    sql = 'select count(*) as count from sys.fakedirectory where name = \'' + req.query.name + '\' and super = ' + req.query.id;
    console.log('new query' + sql);

    query = con.query(sql);
    query.on('result',function(row){
        if(row.count == '0'){
            sql = 'insert into sys.fakedirectory values (default, \'' + req.query.name + '\' , ';
            if(req.query.id == 0){
                sql += 'null)';
            }else{
                sql += req.query.id + ')'
            }
            console.log('new query: ' + sql);
            con.query(sql).on('end',function(){
                res.end('success');
            })
        }
        else{

        }res.end('Folder exist!');

    })

    //res.end('success');
};

function get_folder_info(id,call_back, html_res){
    var sql = 'select name,ifnull(super,\'null\') as super from sys.fakedirectory where idfakedirectory = '+ id;
    console.log('new query :' + sql);
    var query = con.query(sql);
    var name,super_id;
    query.on('result', function(row) {
        name = row.name.toString();
        super_id = row.super.toString();
    });
    query.on('end',function(){
        call_back(name,super_id, html_res);
    });
};

function on_get_folder_info(name, super_id, html_res)
{
    directory = name + '/' + directory;
    console.log('directory inside = ' + directory);
    id = super_id;
    if (id != 'null') {

    }
}

exports.get_full_folder_directory = function (req,res,next) {
    var directory = '';
    var id = req.query.id;
    var sql = 'select name, ifnull(super,\'null\'\) as super from sys.fakedirectory where idfakedirectory =' + req.query.id;
    console.log("new query" + sql);
    var query = con.query(sql);

    query.on('result', function (row) {
        console.log(row);
        directory = row.name.toString();
        id = row.super.toString();
    });
    query.on('end', function () {
        // console.log('directory before = ' + directory);
        //
        // get_folder_info(id, function(name, super_id){
        //     directory = name + '/' + directory;
        //     console.log('directory inside = ' + directory);
        //     id = super_id;
        // });
        get_folder_info(id, on_get_resonpse);

        res.end(directory);
        console.log('directory after = ' + directory);

    });
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