var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NaturalTypeSchema = new Schema({
    name: {type: String, rquired: true}
})

module.exports = mongoose.model('NaturalType', NaturalTypeSchema);