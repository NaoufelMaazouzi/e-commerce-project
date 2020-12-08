const router = require('express').Router();
const admin = require('firebase-admin');

router.route('/').get(async (req, res) => {
    const db = admin.firestore();
    db.collection('products').get()
        .then((data) => {
            return res.json(data.docs.map(doc => doc.data()))
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
