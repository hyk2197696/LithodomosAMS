const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    lastName: String,
    firstName: String,
    email: {type: String, rquired: true},
    passwordHash: {type: String, required: true},
    passwordSalt: {type: String, required: true},
    level: {type: String, enum: ['admin','user']},
    create: {type:Boolean, default: false},
    delete: {type:Boolean, default: false},
    update: {type:Boolean, default: false}
});

module.exports = mongoose.model('User', UserSchema);