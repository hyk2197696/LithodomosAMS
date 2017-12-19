var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReferenceSchema = new Schema({
    name:{type: String, rquired:true}
})

module.exports = mongoose.model('Project', ReferenceSchema);