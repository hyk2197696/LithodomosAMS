var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StatueTypeSchema = new Schema({
    name: {type: String, rquired: true}
})

module.exports = mongoose.model('StatueType', StatueTypeSchema);