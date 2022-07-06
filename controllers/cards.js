const { SERVER_ERROR } = require('../helpers/utils');
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
  Card.create({ name, link })
    .then((card) => res.send({ data: card }))
    .catch(() => {
      res.status(SERVER_ERROR).send('An error occurred on the server');
    });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(SERVER_ERROR).send(err));
}

module.exports = { getCards, createCard, deleteCard };
