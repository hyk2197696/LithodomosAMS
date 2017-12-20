var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FakeDirectorySchema = new Schema({
    name:{type: String, required:true},
    super:[this]
});




module.exports = mongoose.model('FakeDirectory', FakeDirectorySchema);