const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShaderTypeSchema = new Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model('ShaderType', ShaderTypeSchema);