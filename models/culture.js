var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CultureSchema = new Schema({
    name: {type: String, rquired: true}
})

module.exports = mongoose.model('Culture', CultureSchema);