const { taskModel } = require("../model/activity")
const appError = require('./../utils/errorhandler')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;


async function getAll(req, res, next) {
    try {
        if (req.user.active === true) {
            const userId = req.user.id
            const userTasks = await taskModel.find({ user: userId });
            if (!userTasks) return next(new appError('cannot find activity', 404))
            res.status(200).json({ result: "SUCCES", size: userTasks.length, userTasks })
        }
    } catch (err) {
        next(new appError(err, 500))
    }

}

async function createNewTask(req, res, next) {
    try {
        const body = req.body;
        body.user = req.user._id;
        if (req.user.active === true) {
            const newTask = await taskModel.create(body);

            res.status(201).json({ result: "SUCCESS", message: 'A new activity has been added', newTask });
        }
        else {
            return next(new appError('cannot create new activity', 400))
        }
    } catch (err) {
        next(new appError(err, 500))
    }
}

async function updateTask(req, res, next) {
    try {
        if (req.user.active === true) {
            const task = await taskModel.findById(req.params.id)
            task.status = 'completed',
                await task.save();
            res.status(201).json({ result: "SUCCESS", message: 'activity has been updated', task })
        }
        else {
            return next(new appError('User does not exist kindly signUp', 404))
        }

    } catch (err) {
        next(new appError(err, 500))
    }

}
async function deleteTask(req, res, next) {
    try {
        if (req.user.active === true) {
            const task = await taskModel.findById(req.params.id)
            task.status = 'deleted'
            await task.save();
            res.status(200).json({ result: "SUCCESS", message: 'An activity has been deleted', task })
        } else {
            return next(new appError('User does not exist kindly signUp', 404))
        }

    } catch (err) {
        next(new appError(err, 500))
    }

}

async function getTaskStats(req, res) {
    try {
        const userId = req.user._id
        const pipeline = [
            { $match: { user: new ObjectId(userId) } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    status: "$_id",
                    count: 1,
                },
            }

        ]
        if (req.user.active === true) {
            const taskStats = await taskModel.aggregate(pipeline)
            res.status(200).json({ result: 'SUCESS', taskStats })

        }
    } catch (err) {
        next(new appError(err, 500))
    }
}

module.exports = { getAll, 
    deleteTask, 
    updateTask, 
    createNewTask, 
    getTaskStats }