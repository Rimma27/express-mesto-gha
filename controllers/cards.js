const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемая карточка не найдена' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then(() => res.status(201).send({ data: { name, link } }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};
