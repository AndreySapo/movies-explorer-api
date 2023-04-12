const { PORT = 3000, SERVER = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const regexEmail = require('./utils/regexEmail');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { createUser, signin } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();

mongoose.set('strictQuery', false);

// подключаемся к серверу mongo
mongoose.connect(SERVER, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// # создаёт пользователя с переданными в теле
// # email, password и name
// POST /signup

// # проверяет переданные в теле почту и пароль
// # и возвращает JWT
// POST /signin

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().regex(regexEmail),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().regex(regexEmail),
      password: Joi.string().required().min(8),
    }),
  }),
  signin,
);

app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);

// eslint-disable-next-line no-console
console.log(`Сервер ${SERVER}:${PORT} успешно подключен`);
app.listen(PORT);
