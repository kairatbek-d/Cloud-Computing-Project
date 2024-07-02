const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    email: { type: String, unique : true },
    password:{ type: String},
    token: { type: String},
    // createdAt: String
});

module.exports = model('User', userSchema);