var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DiagramTypeSchema = new Schema({
    name:{type: String, rquired:true}
})

module.exports = mongoose.model('DiagramType', DiagramTypeSchema);