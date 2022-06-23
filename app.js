const express = require('express');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use('/', userRouter);
app.listen(PORT);
