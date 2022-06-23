const router = require('express').Router();
const path = require('path');
const { getDataFromFile } = require('../helpers/files');

const usersDataPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => {
  getDataFromFile(usersDataPath)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => err);
});

router.get('/', (req, res) => {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});

router.get('/users/:id', (req, res) => {
  const selectedUser = users.filter((user) => user._id === req.params.id);
  if (selectedUser) {
    res.send(selectedUser);
  } else {
    res.status(404);
    res.send({ message: 'User ID not found' });
  }
});

router.get('/:anything', (req, res) => {
  if (req.params.anything === 'users') {
    res.send(users);
  }
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});

module.exports = router;
