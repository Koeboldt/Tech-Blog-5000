const router = require("express").Router();
const { BlogPost} = require('../../models');

router.post('/', async (req,res) => {
    try {
        const postData = await BlogPost.create({
            user_id: req.session.user_id,
            postContent: req.body.postContent
        });
        res.status(200).json(postData);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});
module.exports = router