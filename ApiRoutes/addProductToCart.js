const router = require('express').Router();
const admin = require('firebase-admin');
const db = admin.firestore();

router.route('/add').post(async (req, res) => {
    const product = req.body.product;
    product.size = req.body.size
    console.log(product)
    db.collection('users').doc(req.body.id).update({
        products: admin.firestore.FieldValue.arrayUnion(product)
    })
        .then(e => {
            return res.status(200).json(e)
        })
        .catch(err => res.status(400).json(err))
});

router.route('/delete').post(async (req, res) => {
    db.collection('users').doc(req.body.id).update({
        products: admin.firestore.FieldValue.arrayRemove(req.body.product)
    })
        .then(e => {
            return res.status(200).json(e)
        })
        .catch(err => res.status(400).json(err))

});

module.exports = router;
