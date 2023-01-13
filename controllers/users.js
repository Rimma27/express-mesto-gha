const User = require('../models/user');
const {
  ERROR_CODE_INCORRECT_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAULT,
  SUCCESS_CODE,
} = require('../utils/constans');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS_CODE).send({ data: users }))
    .catch(() => res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(SUCCESS_CODE).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Передан невалидный ID' });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS_CODE).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Ошибка валидации полей' });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка на сервере' });
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
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(SUCCESS_CODE).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Ошибка валидации полей' });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка на сервере' });
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
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(SUCCESS_CODE).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Ошибка валидации полей' });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};
