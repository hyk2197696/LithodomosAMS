var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MaterialSchema = new Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('Material', MaterialSchema);