var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FileTypeSchema = new Schema({
    name:{type: String, required:true}
})

module.exports = mongoose.model('FileType', FileTypeSchema);