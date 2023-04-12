const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// const regexLink = require('../utils/regexLink');
const regexEmail = require('../utils/regexEmail');
const { userInfo, updateUser, createUser: signup, signin } = require('../controllers/users');

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me

usersRouter.get('/me', userInfo);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().regex(regexEmail),
    }),
  }),
  updateUser,
);

module.exports = usersRouter;
