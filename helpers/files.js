const fsPromise = require('fs').promises;

function getDataFromFile(dataPath) {
  return fsPromise
    .readFile(dataPath, { encoding: 'utf8' })
    .then((data) => JSON.parse(data))
    .catch((err) => err);
}

module.exports = { getDataFromFile };
