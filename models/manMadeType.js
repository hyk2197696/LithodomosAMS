var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ManMadeTypeSchema = new Schema({
    name:{type: String, rquired:true}
})

module.exports = mongoose.model('ManMadeType', ManMadeTypeSchema);