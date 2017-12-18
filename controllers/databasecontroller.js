/**
 * Controller for accessing MYSQL database
 */
var mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database : "sys"
});

con.connect(function(err) {
    if (err) throw err;
    return;
});


module.exports = con;