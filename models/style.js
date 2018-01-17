const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StyleSchema = new Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model('Style', StyleSchema);