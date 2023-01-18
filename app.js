const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

app.use(express.json());

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validationCreateUser, validationLogin } = require('./middlewares/validation');
const centralizedHandler = require('./middlewares/centralizedHandler');

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый адрес не найден. Проверьте URL и метод запроса'));
  next();
});
app.use(errors());
app.use(centralizedHandler);

async function connect() {
  await mongoose.connect(MONGO_URL);
  console.log(`Server connect db ${MONGO_URL}`);
  await app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
}

connect();
