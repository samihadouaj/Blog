const express = require('express');
const router = express.Router();
const {Post, validatePost} = require('../models/post');
const auth = require('../middleware/auth');
const postAdmin = require('../middleware/postAdmin');
const {User} = require('../models/user');

router.post('/',auth, async (req, res) => {
        const owner = await User.findOne({name : req.body.ownerName});
        let post = new Post({
        title: req.body.title,
        subject: req.body.subject,
        content: req.body.content,
        type: req.body.type,
        owner:  {
            _id:owner._id,
            ownerName: req.body.ownerName}
    });

    const {error} = validatePost(req.body);
    if(error) return res.status(400).send(error.details[0].message); 

    post = await post.save();
     await User.updateOne(
        {name: req.body.ownerName},
          {$push: {posts: post._id}},
          {new: true}
    );
    res.send(post);
});


router.put('/:postId',[auth, postAdmin], async(req, res) => {
        const postId = req.params.postId;
       await Post.findByIdAndUpdate({_id: postId}, 
        {$set: {
                title: req.body.title,
                subject: req.body.subject,
                content: req.body.content,
                type: req.body.type,
                
        }});
        res.send(JSON.stringify('post updated'));   
} );


router.delete('/:postId' ,[auth, postAdmin], async(req, res) => {
        const postId = req.params.postId;
        const post = await  Post.findById({_id: postId});
        const owner = await User.findById({_id: post.owner._id});
        await Post.findByIdAndRemove({_id: postId});
      for(let p of owner.posts) {
              if(p == postId)
              {
                      const index = owner.posts.indexOf(p);
                      owner.posts.splice(index, 1);
              }
      }
     await owner.save();
      res.send(JSON.stringify('post deleted'));
});

router.get('/', async (req ,res) => {
        const posts = await  Post.find().sort('-date').select('-__v');
        res.send(posts);
});

router.get('/:postId', async (req ,res) => {
        const postId = req.params.postId;
        const posts = await  Post.findById({_id: postId}).sort('-date').select('-__v');
        res.send(posts);
});


module.exports = router;
