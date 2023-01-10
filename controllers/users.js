const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемый пользователь не найден' }));
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемый пользователь не найден' }));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
}

module.exports.updateUsersProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, {name, about},
    {
      new: true,
      runValidators: true,
      upsert: true
    })
    .then(user => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
}

module.exports.updateUsersAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true
  })
    .then(avatar => res.send({ data: avatar }))
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
}
