const Task = require('../models/task'); 
const User = require('../models/user');
const cloudinary = require('cloudinary');

const APIFeatures = require('../utils/apiFeatures')

// Add new task
exports.newTask = async (req, res, next) => {
    try {
        let selectedImage = null;

        if (req.body.selectedImage) {
            console.log("Uploading image to Cloudinary...");

            const result = await cloudinary.v2.uploader.upload(req.body.selectedImage, {
                folder: 'tasks',
                width: 150,
                crop: 'scale'
            });

            selectedImage = {
                public_id: result.public_id,
                url: result.secure_url
            };

            console.log("Image uploaded successfully:");
        } else {
            console.log("No image provided in request.");
        }

        const { taskTitle, taskDescription, subject, classType, user } = req.body;

        const studentAge = req.body.studentAge && req.body.studentAge.trim() !== "" ? req.body.studentAge : null;
        const studentGrade = req.body.studentGrade && req.body.studentGrade.trim() !== "" ? req.body.studentGrade : null;
        const specialNeeds = req.body.specialNeeds && req.body.specialNeeds.trim() !== "" ? req.body.specialNeeds : null;

        const task = await Task.create({
            taskTitle,
            taskDescription,
            subject,
            classType,
            studentAge,
            studentGrade,
            specialNeeds,
            selectedImage, 
            user
        });

        res.status(201).json({
            success: true,
            task
        });
    } catch (error) {
        console.error("Error occurred while creating task:", JSON.stringify(error, null, 2)); // Ispisuje grešku
        next(error);
    }
};




// Get all tasks
exports.getTasks = async (req, res, next) => {
    try {
        let apiFeatures = new APIFeatures(Task.find(), req.query)
            .search()
            .filter();

        let tasks = await apiFeatures.query
            .sort({ createdAt: -1 })
            .populate({
                path: "user", 
                select: "name lastname selectedImage" 
            });

        const taskCount = await Task.countDocuments();

        res.status(200).json({
            success: true,
            count: tasks.length,
            taskCount,
            tasks 
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




// Get single task
exports.getSingleTask = async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
    }

    res.status(200).json({
        success: true,
        task
    });
};

// Update task => /api/v1/task/:id
exports.updateTask = async (req, res, next) => {
    try {
        const newTaskData = {
            taskTitle: req.body.taskTitle || "",
            taskDescription: req.body.taskDescription,
            subject: req.body.subject,
            classType: req.body.classType,
            studentAge: req.body.studentAge,
            studentGrade: req.body.studentGrade,
            specialNeeds: req.body.specialNeeds
        };

        if (req.body.selectedImage !== '') {
            const task = await Task.findById(req.params.id);

            if (!task) {
                return next(new ErrorHandler('Task not found', 404));
            }

            const image_id = task.selectedImage.public_id;
            await cloudinary.v2.uploader.destroy(image_id);

            const result = await cloudinary.v2.uploader.upload(req.body.selectedImage, {
                folder: 'tasks',
                width: 500,
                crop: "scale"
            });

            newTaskData.selectedImage = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, newTaskData, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            task: updatedTask
        });

    } catch (error) {
        console.error('Error:', JSON.stringify(error, null, 2));
        return next(error);
    }
};

// Delete task
exports.deleteTask = async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({
            success: false,
            message: 'Task not found'
        });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Task is deleted'
    });
};

// Get tasks by user ID => /api/v1/tasks/user/:userId
exports.getTasksByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        // Find all tasks created by the user with the specified userId and sort them by createdAt
        const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 }); // Sortiramo silazno

        if (tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tasks found for this user'
            });
        }

        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
