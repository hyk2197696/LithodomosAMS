var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReferenceSchema = new Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('Reference', ReferenceSchema);