const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regexEmail = require('../utils/regexEmail');
const { userInfo, updateUser } = require('../controllers/users');

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
