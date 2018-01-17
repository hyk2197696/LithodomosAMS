const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StatueTypeSchema = new Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model('StatueType', StatueTypeSchema);