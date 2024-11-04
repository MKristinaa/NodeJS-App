
const express = require('express');
const router = express.Router();

const {
    getTasks,
    newTask,
    getSingleTask,
    updateTask,
    deleteTask,
    getTasksByUserId
} = require('../controllers/taskController'); 

// Route to get all tasks
router.route('/tasks').get(getTasks);

// Route to get a single task by ID
router.route('/task/:id').get(getSingleTask);

// Route to create a new task
router.route('/task/new').post(newTask);

// Route to update an existing task
router.route('/task/update/:id').put(updateTask);

// Route to delete a task
router.route('/task/delete/:id').delete(deleteTask);

// Route to get tasks by user ID
router.route('/tasks/user/:userId').get(getTasksByUserId);

module.exports = router;
