var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PublicationSchema = new Schema({
    name: {type: String, rquired: true}
})

module.exports = mongoose.model('Publication', PublicationSchema);