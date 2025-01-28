const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: [true, 'Molimo unesite cenu'], 
        min: [0, 'Cena mora biti pozitivan broj'], 
    },
    qualifications: {
        type: String,
        required: [true, 'Molimo unesite kvalifikacije'],
        maxLength: [100, 'Kvalifikacije ne mogu imati više od 100 karaktera'],
    },
    offerDescription: {
        type: String,
        maxLength: [100, 'Opis ponude ne može imati više od 100 karaktera'],
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: [true, 'ID zadatka je obavezan'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'ID korisnika je obavezan'], 
    },
    status: {
        type: String,
        enum: ['u procesu', 'prihvaćeno', 'odbijeno'], 
        default: 'u procesu', 
    },
    deadline: {
        type: Date,
        default: null, // Nullable, no conditions
    },
    proposedTimes: {
        type: [Date],
        default: [], // Nullable, no conditions
    },
    lessonDuration: {
        type: Number, 
        default: null, // Nullable, no conditions
    },
    lessonMode: {
        type: String,
        enum: ['online', 'uživo', 'oba'], 
        default: null, // Nullable, no conditions
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
