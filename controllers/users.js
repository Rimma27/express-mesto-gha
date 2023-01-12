const User = require('../models/user');
const {
  ErrorCodeIncorrectData,
  ErrorCodeNotFound,
  ErrorCodeDefault,
  SuccessCode,
} = require('../utils/constans');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SuccessCode).send({ data: users }))
    .catch(() => res.status(ErrorCodeDefault).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ErrorCodeNotFound).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(SuccessCode).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ErrorCodeIncorrectData).send({ message: 'Передан невалидный ID' });
      } else {
        res.status(ErrorCodeDefault).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(SuccessCode).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ErrorCodeIncorrectData).send({ message: 'Ошибка валидации полей' });
      } else {
        res.status(ErrorCodeDefault).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.updateUsersProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(SuccessCode).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ErrorCodeIncorrectData).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(ErrorCodeDefault).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.updateUsersAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.status(SuccessCode).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ErrorCodeIncorrectData).send({ message: 'Пользователь с указанным _id не найден.' });
      } else {
        res.status(ErrorCodeDefault).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};
