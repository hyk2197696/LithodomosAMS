const extend = require('mongoose-schema-extend');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Asset = require('./asset');

const ModelSchema = Asset.schema.extend({
    levelOfDetail: {type: String, required: true, enum: ['high', 'low', 'optimised']}
});


module.exports = Model = mongoose.model('Model', ModelSchema);
