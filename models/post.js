const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const postSchema  = new mongoose.Schema({
    title: {type: String, required: true},
    subject: {type: String, required: true},
    content: {type: String, required: true},
    type: {type: String, enum: ['Article', 'Image']},
    likes: {type: Number, default: 0},
    date:{type: Date, default: Date.now()},
    owner: {type: new mongoose.Schema({ownerName: String}), required: true},
    comments: [{type: String}]
});

const Post = mongoose.model('Post', postSchema);

function validatePost(post) {
    const Schema = {
       title: Joi.string().required(),
       subject: Joi.string().required(),
       content: Joi.string().required(),
       type: Joi.string().required(),
       like: Joi.number(),
       date: Joi.date(),
       ownerName: Joi.string(),
       comment: Joi.objectId()
    };

    return Joi.validate(post, Schema)
}

module.exports.Post = Post;
module.exports.validatePost = validatePost;
