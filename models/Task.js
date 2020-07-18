const mongoose = require('mongoose');
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    solutions: {
        type: [Schema.Types.ObjectId],
        ref: 'Solution'
    },
    responsibles: {
        type: [Schema.Types.ObjectId],
        ref: 'Student'
    },
    type: {
        type: String,
        enum: ['document', 'custom'],
        default: 'custom'
    },
    questions: {
        type: [Object],
        default: [{ text: "Question 1", answer: "a", choices: ["a", "b", "c", "d"], points: 100 }]
    },
    document: {
        type: String
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    expirationDate: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;