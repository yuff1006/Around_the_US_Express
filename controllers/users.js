const { SERVER_ERROR, NOT_FOUND, BAD_REQUEST } = require('../helpers/utils');
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
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send('Please make a valid request');
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send('User not found');
      }
    });
}

function createNewUser(req, res) {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Please make a valid request' });
      }
    });
}

function updateUser(req, res) {
  const { name, about } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(
    owner,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Please make a valid request' });
      }
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(owner, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Please make a valid request' });
      }
    });
}
module.exports = {
  getUsers,
  getUserById,
  createNewUser,
  updateUser,
  updateAvatar,
};
