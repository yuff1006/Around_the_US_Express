const express = require('express');
const users = require('./users.json');

const { PORT = 3000 } = process.env;
const app = express();
app.get('/', (req, res) => {
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});
app.get('/:anything', (req, res) => {
  if (req.params.anything === 'users') {
    res.send(users);
  }
  res.status(404);
  res.send({ message: 'Requested resource not found' });
});
app.get('/users/:id', (req, res) => {
  const selectedUser = users.filter((user) => user._id === req.params.id);
  if (selectedUser) {
    res.send(selectedUser);
  } else {
    res.status(404);
    res.send({ message: 'User ID not found' });
  }
});
app.listen(PORT);
