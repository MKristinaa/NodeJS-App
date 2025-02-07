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
        maxLength: [1000, 'Kvalifikacije ne mogu imati više od 100 karaktera'],
    },
    offerDescription: {
        type: String,
        maxLength: [1000, 'Opis ponude ne može imati više od 100 karaktera'],
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
    proposedTimes: {
        type: [Date],
        default: [],
    },
    lessonDuration: {
        type: Number, 
        default: null, 
    },
    lessonMode: {
        type: String,
        enum: ['online', 'uživo'], 
        default: null, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
