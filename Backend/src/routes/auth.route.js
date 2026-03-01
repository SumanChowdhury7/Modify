const express = require('express');
const authController = require('../controllers/auth.controller')
const authUser = require('../middlewares/auth.middleware');

const authRouter = express.Router();

authRouter.post('/register',authController.registerController)
authRouter.post('/login',authController.loginController)
authRouter.get('/get-me',authUser,authController.getMeController)

module.exports = authRouter;