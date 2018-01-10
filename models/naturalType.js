var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NaturalTypeSchema = new Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('NaturalType', NaturalTypeSchema);