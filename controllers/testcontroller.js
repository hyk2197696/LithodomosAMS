db = require('./databasecontroller')

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

Person
    .create({ id: 3, name: "John", surname: "Doe", age: 27 }, function(err) {
        if (err) throw err;

    });
