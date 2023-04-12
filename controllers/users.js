const bcrypt = require('bcrypt');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.userInfo = (req, res) => { // ! добавть next для обработки ошибок
  // TODO обработать ошибки
  // res.send(req.user);
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        // throw new ErrorNotFound('Пользователя с указанным _id не существует');
        res.send('Пользователя с указанным _id не существует');
      }

      res.send({
        data: {
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch((err) => res.send(err));
};

module.exports.updateUser = (req, res) => { // ! добавть next для обработки ошибок
  // ! пока что просто выводим то, что отправили в боди
  // TODO сделать запрос на обновление данных пользователя
  // res.send(req.user);
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => res.send(err));// TODO добавить обработку ошибок
};

module.exports.createUser = (req, res) => { // ! добавть next для обработки ошибок
  const { email, name, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      const { _id } = user;

      return res.status(201).send({
        email,
        name,
        _id,
      });
    })
    .catch((err) => res.send(err));// TODO добавить обработку ошибок
};

module.exports.signin = (req, res) => { // ! добавть next для обработки ошибок
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        // TODO подключить env
        // NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        'dev-secret',
        { expiresIn: '7d' },
      );

      // TODO подумать, нужен ли куки?
      // res.cookie('jwt', token, {
      //   maxAge: 3600000 * 24 * 7,
      //   httpOnly: true,
      // });

      res.send({ token: `${token}` });
    })
    .catch((err) => res.send(err));
};
