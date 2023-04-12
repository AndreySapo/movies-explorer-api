const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regexLink = require('../utils/regexLink');
const regexEmail = require('../utils/regexEmail');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id

moviesRouter.get('/', getMovies);

moviesRouter.post('/', createMovie);

moviesRouter.delete('/:movieID', deleteMovie);

module.exports = moviesRouter;
