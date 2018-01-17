const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ManMadeTypeSchema = new Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model('ManMadeType', ManMadeTypeSchema);