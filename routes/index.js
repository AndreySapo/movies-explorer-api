const appRouter = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, signin, signout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const ErrorNotFound = require('../errors/ErrorNotFound');
const { createUserValidation, singinUserValidation } = require('../middlewares/validation');

appRouter.post('/signup', createUserValidation, createUser);

appRouter.post('/signin', singinUserValidation, signin);

appRouter.post('/signout', auth, signout);

appRouter.use('/users', auth, usersRouter);
appRouter.use('/movies', auth, moviesRouter);
appRouter.use(auth, (req, res, next) => next(new ErrorNotFound('Этот путь не реализован')));

module.exports = appRouter;
