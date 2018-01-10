const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PropSchema = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true}
});

module.exports = mongoose.model('Prop', PropSchema);