const express = require('express');
const router = express.Router();
const auth = require('../routes/Auth');
const bcrypt = require('bcrypt');
const {User, validateUser} = require('../models/user');
const {Post} = require('../models/post');
const existence = require('../middleware/existence');
router.post('/', existence, async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.body.image,
    });
    
   const {error} = validateUser(req.body);
     if(error) return res.status(400).send(error.details[0].message); 

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();
    await Post.updateOne({_id: req.body.likedPostId}, {$inc:{likes: 1}});
    const token = user.generateToken();
    let response = JSON.stringify({token: token });
    res.send(response);
});

router.put('/like', auth, async (req, res) => {
    const likedPost =await  Post.findById({_id: req.body.likedPostId});
   // const actualUser = await User.findById({_id: actualUserId});

    await User.updateOne({_id: req.body.actualUserId}, 
    {$push: {likedPosts: likedPost._id}});
       await Post.updateOne({_id: req.body.likedPostId}, {$inc:{likes: 1}});

res.send('true');
});

router.put('/dislike',auth, async (req, res) => {
    const likedPost =await  Post.findById({_id: req.body.likedPostId});
  //  const actualUser = await User.findById({_id: actualUserId});

    await User.updateOne({_id: req.body.actualUserId}, 
    {$pull: {likedPosts: likedPost._id}});

    await Post.updateOne({_id: req.body.likedPostId}, {$inc:{likes: -1}});
res.send('true')
});

router.put('/:id',auth, async (req, res) => {
    const id = req.params.id;
    let password = ' '
    if(req.body.password) {
    const salt = await bcrypt.genSalt(10);
     password = await bcrypt.hash(req.body.password, salt);
}   
else {
    const user = await User.findById({_id: id});
    password = user.password

}   
        try{
    await User.findByIdAndUpdate({_id: id},
        {$set:{
            name: req.body.name,
            email: req.body.email,
            password: password,
            image: req.body.image
        }}
    );
    res.send(JSON.stringify('you re profile was succefully updated'));
    } catch (ex) {
        res.send(JSON.stringify(ex));
    }
});

router.delete('/:id',auth, async(req, res) => {
    const id = req.params.id;
    await User.deleteOne({_id: id});
    res.send('deleted');
});

router.get('/:id',  async (req, res) => {
    const id = req.params.id;
   const user =  await User.findById({_id: id}).select('-__v');
   res.send(user);
});

router.get('/', async (req, res) => {
   const users =  await User.find().sort('name').select('-__v');
   res.send(users);
});

module.exports = router;
