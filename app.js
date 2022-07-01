const express = require('express');
const mongoose = require('mongoose');

const helmet = require('helmet');

const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/arounddb');
const { PORT = 3000 } = process.env;

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const homePageRouter = require('./routes/app');

app.use('/', homePageRouter);
app.use('/', userRouter);
app.use('/', cardsRouter);
app.listen(PORT);
