const userRoutes = require('express').Router();
const {
  getUsers, getUserById, updateUsersProfile, updateUsersAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  validationUserId,
  validationUpdateUsersProfile,
  validationUpdateUsersAvatar,
} = require('../middlewares/validation');

userRoutes.get('/', getUsers);

userRoutes.get('/:userId', validationUserId, getUserById);

userRoutes.patch('/me', validationUpdateUsersProfile, updateUsersProfile);

userRoutes.patch('/me/avatar', validationUpdateUsersAvatar, updateUsersAvatar);

userRoutes.get('/me', getCurrentUser);

module.exports = userRoutes;
