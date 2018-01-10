var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    name: {type: String, required: true}
})

module.exports = mongoose.model('Project', ProjectSchema);