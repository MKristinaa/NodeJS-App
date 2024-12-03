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
        ref: 'Task', // Pretpostavka da postoji model `Task`
        required: [true, 'Task ID is required'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Pretpostavka da postoji model `User`
        required: [true, 'User ID is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatski unosi trenutni datum i vreme
    }
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
