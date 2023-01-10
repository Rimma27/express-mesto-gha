const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  req.user = {
    _id: '' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})