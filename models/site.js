const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SiteSchema = new Schema({
    name: {type: String, required: true},
    country: {type: Schema.objectId, ref: 'Country'}
});

module.exports = mongoose.model('Site', SiteSchema);