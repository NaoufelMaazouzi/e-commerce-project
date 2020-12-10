const router = require('express').Router();
const admin = require('firebase-admin');

router.route('/').post(async (req, res) => {
    console.log(req);
    admin.auth().signInWithCustomToken(req.body.token)
        .then((user) => {
            console.log('Loged in', user)
            admin.auth().createCustomToken(user.uid)
                .then(token => {
                    return res.status(200).json(token)
                })
        })
        .catch((error) => {
            console.log('error', error.message)
            return res.status(400).json(error.message);
        });
});

module.exports = router;
