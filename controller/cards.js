const path = require('path');
const { getDataFromFile } = require('../helpers/files');

const cardsDataPath = path.join(__dirname, '..', 'data', 'cards.json');

function getCards(req, res) {
  getDataFromFile(cardsDataPath)
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send('An error occured on the server');
    });
}

module.exports = getCards;
