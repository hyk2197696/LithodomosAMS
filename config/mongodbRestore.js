'use strict';
/**
 * @file callback example
 * @module mongodb-restore
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var restore = require('mongodb-restore'); // use require('mongodb-restore') instead

//let dir = process.cwd().replace(/\\/g,'/') + '/../file/mongo';
/*
 * use
 */
restore({
    uri: 'mongodb://localhost:27017/lithodomos', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: dir, // write files into this dir
    callback: function(err) {

        if (err) {
            console.error(err);
        } else {
            console.log('finish');
        }
    }
});

