const userRoutes = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUsersProfile, updateUsersAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', getUserById);

userRoutes.post('/', createUser);

userRoutes.patch('/me', updateUsersProfile);

userRoutes.patch('/me/avatar', updateUsersAvatar);

module.exports = userRoutes;
