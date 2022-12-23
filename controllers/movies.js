const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const ServerError = require('../errors/ServerError');
const {
  MSG_ERR_NOT_FOUND_MOVIE,
  MSG_ERR_INCORRECT_DATA,
  MSG_ERR_FORBIDDEN,
  MSG_ERR_SERVER,
  MSG_DELETE_MOVIE,
} = require('../utils/messages');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(() => next(new ServerError(MSG_ERR_SERVER)));
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
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
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
      } else {
        next(new ServerError(MSG_ERR_SERVER));
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MSG_ERR_NOT_FOUND_MOVIE);
      }
      if (req.user._id !== String(movie.owner)) {
        throw new ForbiddenError(MSG_ERR_FORBIDDEN);
      }
      return movie.remove()
        .then(() => res.send({ message: MSG_DELETE_MOVIE }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
      }
      next(err);
    });
};
