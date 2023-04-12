const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const regexLink = require('../utils/regexLink');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);

// ! делаем celebrate для метода createMovie (думаю, нужно добавить min, max и т.п.)
moviesRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(regexLink),
      trailerLink: Joi.string().required().regex(regexLink),
      thumbnail: Joi.string().required().regex(regexLink),
      owner: Joi.string().hex().length(24),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

moviesRouter.delete(
  '/:movieID',
  celebrate({
    params: Joi.object().keys({
      movieID: Joi.string().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = moviesRouter;
