const router = require('express').Router();

const getHomePage = require('../controller/app');

router.get('/', getHomePage);

module.exports = router;
