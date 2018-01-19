'use strict';
/**
 * @file callback example
 * @module mongodb-backup
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
const backup = require('mongodb-backup'); // use require('mongodb-backup') instead
const CronJob = require('cron').CronJob;
let dir = process.cwd().replace(/\\/g,'/') + '/../file/mongo';
//console.log(dir);
new CronJob('00 50 12 * * 5', () => {
    console.log("start backup");
    var backup = require('mongodb-backup'); // use require('mongodb-backup') instead

    /*
     * use
     */
    backup ({
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
}, null, true, 'Australia/Melbourne');
