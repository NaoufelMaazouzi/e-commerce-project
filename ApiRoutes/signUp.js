const router = require('express').Router();
const admin = require('firebase-admin');
const db = admin.firestore();

router.route('/').post(async (req, res) => {
    admin.auth().createUser({
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        displayName: req.body.name,
        disabled: false
    })
        .then((user) => {
            console.log('User created', user.uid)
            db.collection('users').doc(user.uid).set({
                name: user.displayName,
                email: user.email
            })
                .then(() => {
                    admin.auth().createCustomToken(user.uid)
                        .then(token => {
                            return res.status(200).json(token)
                        })
                })
        })
        .catch((error) => {
            console.log('error', error.message)
            return res.status(400).json(error.message);
        });
});

module.exports = router;
