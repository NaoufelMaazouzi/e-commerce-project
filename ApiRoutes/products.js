const router = require('express').Router();
const admin = require('firebase-admin');
const db = admin.firestore();

router.route('/').get(async (req, res) => {
    db.collection('products').get()
        .then((data) => {
            return res.json(data.docs.map(doc => doc.data()))
        })
        .catch(err => {
            return res.status(400);
        })

    // admin.auth().createUser({
    //     email: 'naoufel.maazouzia@live.fr',
    //     emailVerified: false,
    //     phoneNumber: '+12223734444',
    //     password: 'secretPassword',
    //     displayName: 'John Doe',
    //     photoURL: 'http://www.example.com/12345678/photo.png',
    //     disabled: false
    // })
    //     .then((user) => {
    //         console.log('signed in', user.uid)
    //         admin.auth().createCustomToken(user.uid)
    //             .then(token => console.log('token', token))
    //     })
    //     .catch((error) => {
    //         console.log('error', error.message)
    //     });
});

router.route('/:id').get(async (req, res) => {
    db.collection('products').doc(req.params.id).get()
        .then((product) => {
            return res.json(product.data())
        })
        .catch(err => {
            return res.status(400);
        })
});

// const db = admin.firestore();
// await db.collection('products').get()
//     .then((products) => res.json(products.map(e => e.data())))
//     .catch((err) => res.status(400).json(`Error: ${err}`));

module.exports = router;
