const moviesRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

moviesRouter.get('/', getMovies);

// ! делаем celebrate для метода createMovie (думаю, нужно добавить min, max и т.п.)
moviesRouter.post('/', createMovieValidation, createMovie);

moviesRouter.delete('/:movieID', deleteMovieValidation, deleteMovie);

module.exports = moviesRouter;
