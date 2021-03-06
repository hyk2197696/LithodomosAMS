const CronJob = require('cron').CronJob;
new CronJob('*/1 * * * *', () => {
    console.log("start backup");
    var backup = require('mongodb-backup'); // use require('mongodb-backup') instead

    /*
     * use
     */
    backup ({
        uri: 'mongodb://localhost:27017/lithodomos', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
        root: 'C:/Users/Render4/WebstormProjects/LithodomosAMS/file/mongo', // write files into this dir
        callback: function(err) {

            if (err) {
                console.error(err);
            } else {
                console.log('finish');
            }
        }
    });
}, null, true, 'America/Los_Angeles');

console.log("start");