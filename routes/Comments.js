const express = require('express');
const router = express.Router();
const {Post} = require('../models/post');
const commentAdmin = require('../middleware/commentAdmin');
const {User} = require('../models/user');
const Comment = require('../models/comment');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    let comment = new Comment({
        postId: req.body.postId,
        writerId: req.body.writerId,
        content: req.body.content
});
       comment =  await comment.save();
        await User.updateOne({_id: req.body.writerId} ,
                {$push: {comments: comment._id}});

        await Post.updateOne({_id: req.body.postId} ,
                {$push: {comments: comment._id}});

                res.send(comment)
});
router.put('/:commentId',[auth, commentAdmin], async (req, res) => {
        const commentId = req.params.commentId;
        console.log(commentId);
       // const comment = await Comment.findById({_id: commentId});
       const c =  await Comment.findByIdAndUpdate({_id: commentId}, 
        {$set:{
                content: req.body.content  
        }}, {new: true});
        console.log(c);
        res.send('comment updated');
});

async function deleteEl (obj, commentId) {
        console.log(commentId);
        for (let c of obj.comments) {
                console.log(c);
                if (c == commentId) {
                        console.log('inside if');
                        const index = obj.comments.indexOf(c) ;
                        obj.comments.splice(index, 1);
                }
        }

        await obj.save();
}

router.delete('/:commentId',[auth, commentAdmin] , async (req, res) => {
         const commentId = req.params.commentId;
         const comment = await Comment.findById({_id: commentId});
         const writer = await User.findById({_id: comment.writerId});
         const post = await Post.findById({_id: comment.postId});
         await Comment.deleteOne({_id: commentId});
        deleteEl(writer, commentId);
        deleteEl(post, commentId);
        res.send(JSON.stringify('comment deleted'));
});

router.get('/:postId', async (req, res) => {
        const postId = req.params.postId;
        const comments = await Comment.find({postId : postId}).sort('-date');
        res.send(comments);
});


module.exports = router;
