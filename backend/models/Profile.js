const { model, Schema } = require('mongoose');
let validator = require('validator')

const profileSchema = new Schema({
    phone: String,
    Address: String,
    education: String,
    profession: String,
    created_at: String,
    email:String,
    username:String,
    points:Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Profile', profileSchema);