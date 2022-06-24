const path = require('path');
const { getDataFromFile } = require('../helpers/files');

const cardsDataPath = path.join(__dirname, '..', 'data', 'cards.json');

function getCards(req, res) {
  getDataFromFile(cardsDataPath)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
}

module.exports = getCards;
