var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AssetSchema = new Schema({
    name: {type: String, require: true},
    project: {type: Schema.ObjectId, ref: 'Project'},
    reference: {type: Schema.ObjectId, ref: 'Reference'},
    fakeDirectory: {type: Schema.ObjectId, ref: 'FakeDirectory', require: true},
    trueLocation: {type: String, require: true},
    fileName :{type: String, require: true}
});

module.exports = mongoose.model('Asset', AssetSchema);