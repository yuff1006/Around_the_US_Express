const { NOT_FOUND } = require('../helpers/utils');

function getHomePage(req, res) {
  res.status(NOT_FOUND);
  res.send({ message: 'Requested resource not found' });
}

module.exports = getHomePage;
