var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StyleSchema = new Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('Style', StyleSchema);