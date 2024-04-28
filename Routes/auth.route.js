const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserAuth.controller');
const middlewareToken = require('../utils/jwt.middleware');

const createUserAuthRoute = router.post('/register', userController.CreateUser);
const loginUserAuthRoute = router.post('/login', userController.loginUser);
const updateUserAuthRoute = router.put('/update', middlewareToken, userController.updateUser);
const deleteUserAuthRoute = router.delete('/delete', middlewareToken, userController.deleteUser);


module.exports = {createUserAuthRoute,loginUserAuthRoute, updateUserAuthRoute, deleteUserAuthRoute }

