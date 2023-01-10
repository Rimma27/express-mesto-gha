const userRoutes = require('express').Router();
const { getUsers, getUserById, createUser, updateUsersProfile, updateUsersAvatar } = require('../controllers/users');

userRoutes.get('/users', getUsers)

userRoutes.get('/users/:userId', getUserById)

userRoutes.post('/users', createUser);

userRoutes.patch('/users/me', updateUsersProfile);

userRoutes.patch('/users/me/avatar', updateUsersAvatar);

module.exports = userRoutes;