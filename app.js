const { PORT = 3000, SERVER = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const regexEmail = require('./utils/regexEmail');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { ERROR_INTERNAL_SERVER } = require('./errors/errors');
const ErrorNotFound = require('./errors/ErrorNotFound');
const { createUser, signin } = require('./controllers/users');
const auth = require('./middlewares/auth');

const app = express();
app.use(cors());
app.use(cookieParser());

mongoose.set('strictQuery', false);

// подключаемся к серверу mongo
mongoose.connect(SERVER, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use((req, res, next) => next(new ErrorNotFound('Этот путь не реализован')));

// ! удалить перед отправкой
// eslint-disable-next-line no-console
console.log(`Сервер ${SERVER}:${PORT} успешно подключен`);

app.use(errors());
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
  }
  next();
});
app.listen(PORT);
