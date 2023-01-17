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

userRoutes.get('/me', getCurrentUser);

userRoutes.get('/:userId', validationUserId, getUserById);

userRoutes.patch('/me', validationUpdateUsersProfile, updateUsersProfile);

userRoutes.patch('/me/avatar', validationUpdateUsersAvatar, updateUsersAvatar);

module.exports = userRoutes;
