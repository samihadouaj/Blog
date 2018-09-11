const {User} = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function(req, res, next) {
   const token = req.header('x-auth-token');
   const decoded = jwt.verify(token, config.get('jwtkey'));
   const postId = req.params.postId;
    const ownerId = decoded.id;
    const owner =  await User.findById({_id: ownerId});
    for(let p of owner.posts) {
        if(p == postId) {
            return next();
        }
    }
    res.status(403).send('you can t do that !!!');
};
