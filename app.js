const { PORT = 3000, SERVER = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.set('strictQuery', false);

// подключаемся к серверу mongo
mongoose.connect(SERVER, { useNewUrlParser: true });

// eslint-disable-next-line no-console
console.log(`Сервер ${SERVER}:${PORT} успешно подключен`);
app.listen(PORT);
