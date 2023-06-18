const asyncHandler = require('express-async-handler')
const Task = require('../models/Task')

// @desc    Add new task by Employee
// @route   POST /api/tasks
// @access  Private

const addTask = asyncHandler( async (req, res) => {
    if (!req.body.desc) {
        res.status(400);
        throw new Error("Please add task description");
    }
    if (!req.body.category) {
        res.status(400);
        throw new Error("Please add task type");
    }
    if (!req.body.start_time) {
        res.status(400);
        throw new Error("Please mention the start time");
    }
    if (!req.body.duration) {
        res.status(400);
        throw new Error("Please add task duration");
    }
    
    const task = await Task.create({
        desc: req.body.desc,
        category: req.body.category,
        start_time: req.body.start_time,
        duration: req.body.duration,
        creator: req.user._id
    });
    
    res.status(200).json(task);
})

// @desc    Get all tasks added by an Employee
// @route   GET /api/tasks/:empId
// @access  Private

const getTasks = asyncHandler( async (req, res) => {
    const tasks = await Task.find({ creator: req.params.empId });
    res.status(200).json(tasks);
})

module.exports = {
    addTask, getTasks
}