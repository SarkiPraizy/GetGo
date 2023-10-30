const express = require('express')
const userController = require('./../controller/userController')
const auth = require('./../controller/authController')
const userRouter = express.Router()


userRouter.delete('/deleteAccount', userController.deleteAccount)
userRouter.patch('/UpdateProfile', userController.updateProfile)
userRouter.post('/signUp', userController.signUp)
userRouter.post('/login', userController.Login)

userRouter.post('/logout',auth.isLoggedIn, userController.logout)


module.exports = { userRouter }