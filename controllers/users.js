const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  ERROR_CODE_INCORRECT_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAULT,
  SUCCESS_CODE,
  ERROR_CODE_CONFLICT,
  MONGO_DUPLICATE_ERROR,
  ERROR_UNAUTHORIZED,
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!email || !password) {
        return res.status(ERROR_UNAUTHORIZED).send({ message: 'Неправильные почта или пароль' });
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return res.status(ERROR_UNAUTHORIZED).send({ message: 'Неправильные почта или пароль' });
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          return res.status(SUCCESS_CODE).send({ token });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Ошибка валидации полей' });
      } else {
        res.status(ERROR_CODE_DEFAULT).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.createUser = async (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const hash = await bcrypt.hash(password, 10);
  User.create({
    name, about, avatar, email, password: hash,
  })
    .then((user) => res.status(SUCCESS_CODE).send({ user }))
    .catch((err) => {
      if (err.code === MONGO_DUPLICATE_ERROR) {
        res.status(ERROR_CODE_CONFLICT).send({ message: 'Данный пользователь уже существует' });
      } else if (err.name === 'ValidationError') {
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

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.status(SUCCESS_CODE).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_INCORRECT_DATA).send({ message: 'Передан невалидный ID' });
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
    });
};
