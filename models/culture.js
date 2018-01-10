const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CultureSchema = new Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model('Culture', CultureSchema);