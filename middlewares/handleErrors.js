const { ERROR_INTERNAL_SERVER } = require('../errors/errors');

const handleErrors = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(ERROR_INTERNAL_SERVER).send({ message: 'На сервере произошла ошибка' });
  }
  next();
};

module.exports = handleErrors;
