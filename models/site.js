var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SiteSchema = new Schema({
    name: {type: String, required: true},
    country: {type: Schema.objectId, ref: 'Country'}
})

module.exports = mongoose.model('Site', SiteSchema);