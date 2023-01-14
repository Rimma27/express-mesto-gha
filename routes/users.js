const userRoutes = require('express').Router();
const {
  getUsers, getUserById, updateUsersProfile, updateUsersAvatar, getCurrentUser,
} = require('../controllers/users');

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', getUserById);

userRoutes.patch('/me', updateUsersProfile);

userRoutes.patch('/me/avatar', updateUsersAvatar);

userRoutes.get('/me', getCurrentUser);

module.exports = userRoutes;
