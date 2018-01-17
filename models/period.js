const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PeriodSchema = new Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model('Period', PeriodSchema);