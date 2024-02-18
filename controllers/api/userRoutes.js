const router = require("express").Router();
const { User} = require('../../models');

router.post('/', async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userLoginData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!userLoginData) {
            res.status(404).json({ message: 'username or password incorrect please try again' });
            return;
        }
        const password = await userLoginData.checkPassword(req.body.password);
        if (!password) {
            res.status(404).json({ message: 'username or password incorrect please try again' });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = userLoginData.user_id
            res.status(200).json({ user: userLoginData, message: 'login successful' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
