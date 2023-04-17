const Movie = require('../models/movie');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');

module.exports.getMovies = (req, res) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => res.send(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieID)
    .then((movie) => {
      if (!movie) {
        throw new ErrorNotFound('Фильм с указанным _id не найден.');
      }

      const userID = req.user._id;
      const movieOwner = movie.owner.toString();

      if (userID !== movieOwner) {
        throw new ErrorForbidden('Попытка удалить чужой фильм');
      }

      Movie.findByIdAndDelete(movie._id)
        .then((deletedMovie) => {
          res.send({
            _id: deletedMovie._id,
            message: 'Фильм был удален',
          });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ErrorBadRequest('Некорректные данные при удалении фильма'));
      } else {
        next(err);
      }
    });
};
