const { SERVER_ERROR, BAD_REQUEST, NOT_FOUND } = require('../helpers/utils');
const Card = require('../models/card');

function getCards(req, res) {
  Card.find()
    .orFail()
    .then((data) => res.send(data))
    .catch(() => {
      res
        .status(SERVER_ERROR)
        .send({ message: 'An error occured on the server' });
    });
}

function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Please make a valid request' });
      }
    });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Please make a valid request' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ message: 'User not found' });
      }
    });
}

function likeCard(req, res) {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: owner } }, { new: true })
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ message: 'Card not found' });
      } else if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Please make a valid request' });
      }
    });
}

function unlikeCard(req, res) {
  const { cardId } = req.params;
  const owner = req.user._id;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: owner } }, { new: true })
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(NOT_FOUND).send({ message: 'Card not found' });
      } else if (err.name === 'CastError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'Please make a valid request' });
      }
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
};
