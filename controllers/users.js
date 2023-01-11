const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res) => {
  User.findById(req.user)
    .then((user) => res.status(200).send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемый пользователь не найден' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(() => res.status(201).send({ data: { name, about, avatar } }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUsersProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then(() => res.status(200).send({ data: { name, about } }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUsersAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then(() => res.status(200).send({ data: { avatar } }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};
