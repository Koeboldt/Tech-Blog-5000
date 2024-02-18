const router = require('express').Router();
const { BlogPost,User} = require('../models');
module.exports = router;

router.get('/', async (req, res) => {
    try {
        res.render('home', {
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', async (req, res) => {
    try {
        res.render('signup', {
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts', async (req, res) => {
    try {
        const BlogPostData = await BlogPost.findAll();
        const blog = BlogPostData.map((project) => project.get({ plain: true }));
        res.render('posts', {
            blog,
            session: req.session,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// doesn't work yet because I forgot to use session currently.
router.get('/profile', async (req, res) => {
    try {
        res.render('profile', {
            user: await getUser(req.session.user_id),
            loggedIn: req.session.loggedIn,
            posts: await getUserPosts(req.session.user_id)
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

async function getUser(userId){
const user = await User.findOne({
    where: {
        user_id: userId
    }
})
return user.get({plain: true})
}

async function getUserPosts(userId){
    const userPosts = await BlogPost.findByPk({
        where: {
            user_id: userId
        }
    })
    return userPosts.get({plain: true})
    }