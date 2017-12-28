var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StyleSchema = new Schema({
    name:{type: String, rquired:true}
})

module.exports = mongoose.model('Style', StyleSchema);