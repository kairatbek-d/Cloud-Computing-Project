const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    title: String,
    author: String,
    ISNB: String,
    genres: String,
    url: String,
    username: String,
    createdAt: String,
    PickUPAddress:String,
    isAvailable:Boolean,
    user:{
        type: Schema.Types.ObjectId,
        ref:'users'
    }
});

module.exports = model('Post', postSchema);