const Movie = require('../models/movie');

module.exports.getMovies = (req, res) => {
  // res.send('Запрос дошел до контроллера getMovies');
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => res.send(err));
};

module.exports.createMovie = (req, res) => {
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
  // TODO добавить айди юзера, кто добавляет

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
  })
    .then((movie) => {
      res.send({ data: movie });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.deleteMovie = (req, res) => {
  Movie.findByIdAndRemove(req.params.movieID)
    // eslint-disable-next-line arrow-body-style
    .then((movie) => {
      res.send({ 'movie._id': movie._id });
    })
    .catch((err) => {
      res.send(err);
    });
};
