const mongoose = require('mongoose');
const { isURL } = require('validator');
const { MSG_ERR_INCORRECT_URL } = require('../utils/messages');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isURL(value),
        message: MSG_ERR_INCORRECT_URL,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isURL(value),
        message: MSG_ERR_INCORRECT_URL,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isURL(value),
        message: MSG_ERR_INCORRECT_URL,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
