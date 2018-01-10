var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PublicationSchema = new Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('Publication', PublicationSchema);