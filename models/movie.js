const mongoose = require('mongoose');
require('mongoose-type-url');
const { default: isURL } = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  // * country — страна создания фильма. Обязательное поле-строка.
  country: {
    type: String,
    required: true,
  },
  // * director — режиссёр фильма. Обязательное поле-строка.
  director: {
    type: String,
    required: true,
  },
  // * duration — длительность фильма. Обязательное поле-число.
  duration: {
    type: Number,
    required: true,
  },
  // * year — год выпуска фильма. Обязательное поле-строка.
  year: {
    type: String,
    required: true,
  },
  // * description — описание фильма. Обязательное поле-строка.
  description: {
    type: String,
    required: true,
  },
  // * image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
  image: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    validate: {
      validator: (value) => isURL(value),
      message: 'Неправильный формат ссылки',
    },
  },
  // * trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.
  trailerLink: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    validate: {
      validator: (value) => isURL(value),
      message: 'Неправильный формат ссылки',
    },
  },
  // * thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка.
  // * Запишите её URL-адресом.
  thumbnail: {
    type: mongoose.SchemaTypes.Url,
    required: true,
    validate: {
      validator: (value) => isURL(value),
      message: 'Неправильный формат ссылки',
    },
  },
  // * owner — _id пользователя, который сохранил фильм. Обязательное поле.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  // * movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
  movieId: { // ? может какой-то друго тип данных должен быть?
    type: String,
    required: true,
  },
  // * nameRU — название фильма на русском языке. Обязательное поле-строка.
  nameRU: {
    type: String,
    required: true,
  },
  // * nameEN — название фильма на английском языке. Обязательное поле-строка.
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
