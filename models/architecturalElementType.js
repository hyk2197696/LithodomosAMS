const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArchitecturalElementTypeSchema = new Schema({
    name: {type: String, rquired: true}
});

module.exports = mongoose.model('ArchitecturalElementType', ArchitecturalElementTypeSchema);