var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MaterialSchema = new Schema({
    name: {type: String, rquired: true}
})

module.exports = mongoose.model('Material', MaterialSchema);