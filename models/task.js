const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: [true, 'Please enter task title'],
        trim: true,
        maxLength: [100, 'Task title cannot exceed 100 characters']
    },
    taskDescription: {
        type: String,
        required: [true, 'Please enter task description'],
    },
    subject: {
        type: String,
        required: [true, 'Please enter the subject for this task'],
        enum: {
            values: [
                'Srpski Jezik',
                'Matematika',
                'Priroda i Društvo',
                'Biologija',
                'Hemija',
                'Fizika',
                'Istorija',
                'Geografija',
                'Muzička Kultura',
                'Umetnička Kultura',
                'Strani Jezik'
            ],
            message: 'Please select the correct subject for the task'
        }
    },
    classType: {
        type: String,
        required: [true, 'Please enter the type of class'],
        enum: {
            values: ['Zadatak', 'Privatni časovi'],
            message: 'Please select the correct class type'
        }
    },
    studentName: {
        type: String,
        default: null,
        trim: true,
        maxLength: [50, 'Student name cannot exceed 50 characters']
    },
    studentAge: {
        type: Number,
        default: null 
    },
    studentGrade: {
        type: String,
        default: null 
    },
    specialNeeds: {
        type: String,
        default: null 
    },
    selectedImage: {
        public_id: {
            type: String,
            default: null 
        },
        url: {
            type: String,
            default: null 
        }
    },
    deadline: {
        type: Date,
        required: [true, 'Please enter a deadline for the task']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
