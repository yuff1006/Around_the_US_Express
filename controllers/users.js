const { SERVER_ERROR, NOT_FOUND } = require('../helpers/utils');
const User = require('../models/user');

function getUsers(req, res) {
  User.find()
    .orFail()
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(SERVER_ERROR).send('An error occurred on the server');
    });
}
function getUserById(req, res) {
  User.findById(req.params.id)
    .orFail()
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(NOT_FOUND).send({ message: 'User not found' });
    });
}

function createNewUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => {
      res.status(SERVER_ERROR).send('An error occurred on the server');
    });
}

module.exports = { getUsers, getUserById, createNewUser };
