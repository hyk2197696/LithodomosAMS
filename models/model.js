var extend = require('mongoose-schema-extend');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Asset = require('./asset');

var ModelSchema = Asset.schema.extend({
    levelOfDetail: {type: String, required: true, enum: ['high', 'low', 'optimised']}
})


module.exports = Model = mongoose.model('Model', ModelSchema);
