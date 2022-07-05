const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createNewUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.post('/users', createNewUser);

module.exports = router;
