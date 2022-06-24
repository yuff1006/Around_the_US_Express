const router = require('express').Router();

const { getUsers, getUserById, getHomePage } = require('../controller/users');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.get('/', getHomePage);

module.exports = router;
