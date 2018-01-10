var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShaderTypeSchema = new Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('ShaderType', ShaderTypeSchema);