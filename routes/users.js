const usersRouter = require('express').Router();
const { userInfo, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

usersRouter.get('/me', userInfo);

usersRouter.patch('/me', updateUserValidation, updateUser);

module.exports = usersRouter;
