const router = require('express').Router();

router.route('/').get((req, res) => {
    res.send('server is up and runing');
});

module.exports = router;
