const { SERVER_ERROR, BAD_REQUEST } = require('../helpers/utils');
const Card = require('../models/card');

function getCards(req, res) {
  Card.find()
    .orFail()
    .then((data) => res.send(data))
    .catch(() => {
      res.status(SERVER_ERROR).send('An error occured on the server');
    });
}

function createCard(req, res) {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res.status(BAD_REQUEST).send(err);
    });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(SERVER_ERROR).send(err));
}

module.exports = { getCards, createCard, deleteCard };
