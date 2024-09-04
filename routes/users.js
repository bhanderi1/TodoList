const express = require('express');
const { registerUser, Login, logout, showLoginPage, showRegisterPage } = require('../controller/userController');
const userRouter = express.Router();
const {upload}  = require('../config/imageUpload')


userRouter.get('/login', showLoginPage)
userRouter.post('/login', Login);

userRouter.get('/register',upload.single('/dashboard'), showRegisterPage);
userRouter.post('/register', registerUser);

// userRouter.get('/dashboard', dashboard )

userRouter.delete('/logout', logout);

module.exports = userRouter