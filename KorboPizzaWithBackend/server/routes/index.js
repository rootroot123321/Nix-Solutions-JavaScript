const Router = require('express');
const router = new Router();
const user = require('./user');
const category = require('./category');
const pizza = require('./pizza');

router.use('/user', user);
router.use('/category', category);
router.use('/pizza', pizza);

module.exports = router;