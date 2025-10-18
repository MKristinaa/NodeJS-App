
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

router.route('/tasks').get(getTasks);
router.route('/task/:id').get(getSingleTask);
router.route('/task/new').post(newTask);
router.route('/task/update/:id').put(updateTask);
router.route('/task/delete/:id').delete(deleteTask);
router.route('/tasks/user/:userId').get(getTasksByUserId);

module.exports = router;
