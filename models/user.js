const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 4, maxlength: 255},
    image: {type: String},
    inscriptionDate:{type: Date, default: Date.now()},
    posts : [{type: String}],
    likedPosts: [{type: String}],
    comments:[{type: String}]
});
userSchema.methods.generateToken = function(){
        return jwt.sign({id: this._id, name: this.name, email: this.email}, config.get('jwtkey'))
};
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    schema = {
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().email().required().min(8).max(255),
        password: Joi.string().required().min(4).max(255),
        image: Joi.string(),
        inscriptionDate:Joi.date(),
        posts: Joi.string(),
        likedPostId: Joi.objectId(),
        comments: Joi.objectId()
    };

   return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser= validateUser;

