const router = require('express').Router();
const { BlogPost,User} = require('../models');
const withAuth = require('../utils/auth.js');
module.exports = router;

router.get('/', withAuth, async (req, res) => {
    try {
        res.render('home', {
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
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

router.get('/posts', withAuth, async (req, res) => {
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

router.get('/profile', withAuth, async (req, res) => {
    try {
        res.render('profile', {
            session: req.session,
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