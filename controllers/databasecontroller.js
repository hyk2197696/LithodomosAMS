// /**
//  * Controller for accessing MYSQL database
//  */
// // var mysql = require('mysql')
// //
// // var con = mysql.createConnection({
// //     host: "localhost",
// //     user: "root",
// //     password: "123456",
// //     database : "sys"
// // });
// //
// // con.connect(function(err) {
// //     if (err) throw err;
// //     return;
// // });
// //
// //
// // module.exports = con;
//
// const Sequelize = require('sequelize');
// const lanmbda = require('js-lambda-expression');
//
// const sequelize = new Sequelize('lithodomosams', 'root', '123456', {
//     // the sql dialect of the database
//     // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
//     dialect: 'mysql',
//
//     // custom host; default: localhost
//     //host: 'my.server.tld',
//
//     // custom port; default: dialect default
//     //port: 12345,
//
//     // custom protocol; default: 'tcp'
//     // postgres only, useful for Heroku
//     //protocol: null,
//
//     // disable logging; default: console.log
//     //logging: false,
//
//     // you can also pass any dialect options to the underlying dialect library
//     // - default is empty
//     // - currently supported: 'mysql', 'postgres', 'mssql'
//     // dialectOptions: {
//     //     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
//     //     supportBigNumbers: true,
//     //     bigNumberStrings: true
//     // },
//
//     // the storage engine for sqlite
//     // - default ':memory:'
//     //storage: 'path/to/database.sqlite',
//
//     // disable inserting undefined values as NULL
//     // - default: false
//     //omitNull: true,
//
//     // a flag for using a native library or not.
//     // in the case of 'pg' -- set this to true will allow SSL support
//     // - default: false
//     //native: true,
//
//     // Specify options, which are used when sequelize.define is called.
//     // The following example:
//     //   define: { timestamps: false }
//     // is basically the same as:
//     //   sequelize.define(name, attributes, { timestamps: false })
//     // so defining the timestamps for each model will be not necessary
//     define: {
//         underscored: false,
//         freezeTableName: false,
//         charset: 'utf8',
//         dialectOptions: {
//             collate: 'utf8_general_ci'
//         },
//         timestamps: true
//     },
//
//     // similar for sync: you can define this to always force sync for models
//     sync: { force: true },
//
//     // pool configuration used to pool database connections
//     pool: {
//         max: 5,
//         idle: 30000,
//         acquire: 60000,
//     },
//
//     // isolation level of each transaction
//     // defaults to dialect default
//     isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
// })
//
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
//
// const User = sequelize.define('user', {
//     firstName: {
//         type: Sequelize.STRING
//     },
//     lastName: {
//         type: Sequelize.STRING
//     }
// });
//
// // force: true will drop the table if it already exists
// // User.sync().then(() => {
// //     // Table created
// //     return User.create({
// //         firstName: 'John',
// //         lastName: 'Hancock'
// //     });
// // });
//
// user = await User.findOne()
//
// console.log(user.get('firstName'));


var orm = require("orm");
//// for orm testing

// orm.connect("mysql://root:123456@localhost/lithodomosams", function (err, db) {
//     if (err) throw err;
//
//     var Person = db.define("person", {
//         name      : String,
//         surname   : String,
//         age       : Number, // FLOAT
//         male      : Boolean,
//         continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antarctica" ], // ENUM type
//         photo     : Buffer, // BLOB/BINARY
//         data      : Object // JSON encoded
//     }, {
//         methods: {
//             fullName: function () {
//                 return this.name + ' ' + this.surname;
//             }
//         },
//         validations: {
//             age: orm.enforce.ranges.number(18, undefined, "under-age")
//         }
//     });
//
//     // add the table to the database
//     db.sync(function(err) {
//         if (err) throw err;
//
//         // add a row to the person table
//         Person.create({ id: 1, name: "John", surname: "Doe", age: 27 }, function(err) {
//             if (err) throw err;
//
//             // query the person table by surname
//             Person.find({ surname: "Doe" }, function (err, people) {
//                 // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
//                 if (err) throw err;
//
//                 console.log("People found: %d", people.length);
//                 console.log("First person: %s, age %d", people[0].fullName(), people[0].age);
//
//                 people[0].age = 16;
//                 people[0].save(function (err) {
//                     // err.msg = "under-age";
//                 });
//             });
//
//         });
//     });
// });

var opt = {
    host: 'localhost',
    database: 'lithodomosams',
    user: 'root',
    password:'123456',
    protocol: 'mysql',
    port:     '3306',
    query:    {debug: true}
};

var db = orm.connect(opt);


module.exprots = db