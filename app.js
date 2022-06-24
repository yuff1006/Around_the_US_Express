const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(helmet());

const { PORT = 3000 } = process.env;

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const homePageRouter = require('./routes/app');

app.use('/', homePageRouter);
app.use('/', userRouter);
app.use('/', cardsRouter);
app.listen(PORT);
