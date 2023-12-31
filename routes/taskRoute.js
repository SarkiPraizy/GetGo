const express = require('express')
const taskRouter = express.Router()
const taskController = require('./../controller/taskController')
const authController = require('./../controller/authController')

taskRouter.use(authController.isAuthenticated)


taskRouter.get('/allTask', taskController.getAll)
taskRouter.patch('/updateTask/:id', taskController.updateTask)
taskRouter.post('/createTask', taskController.createNewTask)
taskRouter.delete('/delete/:id', taskController.deleteTask)
taskRouter.get('/stats', taskController.getTaskStats)


module.exports = { taskRouter }