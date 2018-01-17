const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model('Publication', PublicationSchema);