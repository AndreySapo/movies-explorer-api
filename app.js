require('dotenv').config();

// библиотеки из npm
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

// собственные "библиотеки"
const appRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleErrors = require('./middlewares/handleErrors');
const { PORT, DATABASE } = require('./utils/database');
const { limiter } = require('./utils/limiter');

// вкл
const app = express();

// подключаем необходимые библотеки, которые должны быть включены до подключения к серверу
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(requestLogger);

// подключаемся к серверу mongo
mongoose.set('strictQuery', false);
mongoose.connect(DATABASE, { useNewUrlParser: true });

// подключаем необходимые библиотеки
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаем роутер
app.use(appRouter);

// обрабатываем ошибки, записываем их
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

// вкл
app.listen(PORT);
