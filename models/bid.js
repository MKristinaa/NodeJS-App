const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    price: {
        type: Number, 
        required: [true, 'Please enter price'],
        min: [0, 'Price must be a positive number'], 
    },
    qualifications: {
        type: String,
        required: [true, 'Please enter qualifications'],
        maxLength: [100, 'Qualifications cannot exceed 100 characters'],
    },
    offerDescription: {
        type: String,
        maxLength: [100, 'Offer description cannot exceed 100 characters'],
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: [true, 'Task ID is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'], // Enum za validaciju
        default: 'pending', // Podrazumevana vrednost
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
