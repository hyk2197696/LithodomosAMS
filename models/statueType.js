var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StatueTypeSchema = new Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('StatueType', StatueTypeSchema);