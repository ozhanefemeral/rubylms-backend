const mongoose = require('mongoose');
const Schema = mongoose.Schema

const Exam = require('../models/Exam.js');

const lectureSchema = new Schema({
    name: String,
    correctCount: Number,
    falseCount: Number,
    emptyCount: Number,
}, { _id: false })

const examSchema = new Schema({
    lectures: [lectureSchema],
    totalDuration: {
        type: Number,
        default: 160
    },
    solveDuration: {
        type: Number,
        default: 160
    },
    ranking: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;