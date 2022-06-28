const path = require('path');
const { getDataFromFile } = require('../helpers/files');

const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

function getUsers(req, res) {
  getDataFromFile(usersDataPath)
    .then((data) => {
      res.send(data);
    })
    .catch(() => res.status(500).send('An error occurred on the server'));
}
function searchUsers(users, req, res) {
  const selectedUser = users.filter((user) => user._id === req.params.id);
  if (selectedUser) {
    res.send(selectedUser);
  } else {
    res.status(404);
    res.send({ message: 'User ID not found' });
  }
}
function getUserById(req, res) {
  getDataFromFile(usersDataPath)
    .then((data) => {
      searchUsers(data, req, res);
    })
    .catch(() => res.status(500).send('An error occurred on the server'));
}

module.exports = { getUsers, getUserById };
