const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FakeDirectorySchema = new Schema({
    name: {type: String, required: true},
    super: this
});


module.exports = mongoose.model('FakeDirectory', FakeDirectorySchema);