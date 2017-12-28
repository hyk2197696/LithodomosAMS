var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PeriodSchema = new Schema({
    name:{type: String, rquired:true}
})

module.exports = mongoose.model('Period', PeriodSchema);