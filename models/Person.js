var db = require('../controllers/databasecontroller')
var Person = db.define('person', {
    id:      {type: 'serial', key: true}, // the auto-incrementing primary key
    name:    {type: 'text'},
    surname: {type: 'text'},
    age:     {type: 'number'}
}, {
    methods : {
        fullName: function() {
            return this.name + ' ' + this.surname;
        }
    }
});

module.exports = Person;