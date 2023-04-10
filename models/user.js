const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => isEmail(value),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Обязано быть больше 2 символов'],
    maxlength: [30, 'Обязано быть меньше 30 символов'],
    default: 'Александр',
  },
});

module.exports = mongoose.model('user', userSchema);
