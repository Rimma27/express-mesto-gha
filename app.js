const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
const app = express();

app.use(express.json());

const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  req.user = {
    _id: '63bed5a4af62a22b5a77ec50', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

async function connect() {
  await mongoose.connect(MONGO_URL);
  console.log(`Server connect db ${MONGO_URL}`);
  await app.listen(PORT);
  console.log(`App listening on port ${PORT}`);
}

connect();
