const router = require('express').Router();

const getCards = require('../controller/cards');

router.get('/cards', getCards);

module.exports = router;
