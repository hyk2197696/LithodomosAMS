const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DiagramTypeSchema = new Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model('DiagramType', DiagramTypeSchema);