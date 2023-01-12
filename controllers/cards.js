const Card = require('../models/card');
const {
  ErrorCodeIncorrectData,
  ErrorCodeNotFound,
  ErrorCodeDefault,
  SuccessCode,
} = require('../utils/constans');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.status(SuccessCode).send({ data: card }))
    .catch(() => res.status(ErrorCodeDefault).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(SuccessCode).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ErrorCodeIncorrectData).send({ message: 'Ошибка валидации полей' });
      } else {
        res.status(ErrorCodeDefault).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ErrorCodeNotFound).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(SuccessCode).send({ card });
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

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ErrorCodeNotFound).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(SuccessCode).send({ card });
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

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ErrorCodeNotFound).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(SuccessCode).send({ card });
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
