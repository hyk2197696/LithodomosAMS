var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArchitecturalElementTypeSchema = new Schema({
    name: {type: String, rquired: true}
})

module.exports = mongoose.model('ArchitecturalElementType', ArchitecturalElementTypeSchema);