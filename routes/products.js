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
