/**
 * Controller for asset search
 */
var con = require('./databasecontroller')
var app = require('../app')
var json = require('json')


//get method for asset search
exports.search_get = function(req, res, next) {
    res.render('search_form', { title: 'Search Asset' });
};



// Handle Asset search on POST
exports.search_post = function(req, res, next) {

    //Check that the id field is not empty
    req.checkBody('id', 'ID required').notEmpty();

    //Trim and escape the name field.
    req.sanitize('id').escape();
    req.sanitize('id').trim();

    //Run the validators
    var errors = req.validationErrors();



    if (errors) {
        //If there are errors render the form again, passing the previously entered values and errors
        res.render('search_form', { title: 'Search Asset', id:req.body.id, errors: errors});
        return;
    }
    else {
        var sql = "select *  from sys.asset where id = " + req.body.id ;

        console.log("new query:")
        console.log(sql);

        var query = con.query(sql);
        var rowCount = 0;
        var resultJson = []
        query.on('error', function(err) { throw err; })
             .on('result',function(row){
                rowCount ++;
                console.log(row);
                 resultJson.push(row);

                //res.render('asset_list', { list_asset : row});
             })
             .on('end',function(){
                 //if the result has 0 row, jump to empty page
                 if(rowCount == 0) {
                     res.render('success', {title: 'empty', massage: 'empty!'});
                 }
                 else {
                     console.log(resultJson);
                     res.render('asset_list', { list_asset : resultJson})
                 }
             })
    }

};
//