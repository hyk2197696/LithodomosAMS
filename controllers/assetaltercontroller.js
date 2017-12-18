/**
 * Controller for asset alter
 */
var con = require('./databasecontroller')
var app = require('../app')

//asset alter page get method
exports.alter_get = function(req, res, next){
    var sql = "select sys.asset.id, " +
                    "sys.asset.name," +
                    "sys.project.name as project," +
                    "sys.reference.referenceType as reference," +
                    "sys.asset.reference as idReference" +
                    "directory " +
                    "from sys.asset left join sys.project " +
                        "on sys.asset.project = sys.project.idProject " +
                    "left join sys.reference " +
                        "on sys.asset.reference = sys.reference.idReference " +
                    "where sys.asset.id =" + req.query.id;

    //select all the imformation of the specfic asset
    console.log('new query :' );
    console.log(sql);

    con.query(sql).on('result', function(row) {
        //console.log(row);

        var query = con.query('select * from sys.reference');
        var reference_list = [];
        query.on('result', function(row) {
            console.log(row);
            reference_list.push(row);
        });
        query.on('end',function(){
            console.log(reference_list);
            res.render('assetalter', {title: 'Asset Alter', id: req.query.id,
                name: row.name, project: row.project, idReference : row.idReference,
                reference: row.reference, directroy:row.directory, reference_list: reference_list});
        })

    });
}

//post method for asset alter
exports.alter_post = function(req, res, next) {

        sql = 'insert into sys.asset values \( default, \'' + fields.asset_name + '\'\, ';
        //console.log(fields.asset_name);
        if(fields.project_name != ''){
            sql += '(select idProject from sys.project where name = \'' + fields.project_name.toString() + '\'\)\, ';
        }else{
            sql += 'default, ';
        };
        if(fields.reference != '-1'){
            sql += '\'' + fields.reference + '\', ';
        }
        else{
            sql += 'default, ';
        };


        var oldpath = files.file_upload.path;
        var newpath = 'C:/Users/Render4/WebstormProjects/lithodomosVR/file/' + files.file_upload.name;

        sql += '\'' + newpath + '\'\)';
        //insert the altered asset
        console.log(sql);


        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            var query = con.query(sql);
            query.on('end',function(){
                res.render('success', {title: 'Asset creation success'});
            });
            //alert();
        });


};