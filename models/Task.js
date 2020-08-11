const mongoose = require('mongoose');
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    chances: {
        type: Number,
        min: 1,
        max: 5
    },
    solutions: {
        type: [Schema.Types.ObjectId],
        ref: 'Solution'
    },
    responsibles: {
        type: [Schema.Types.ObjectId],
        ref: 'Student'
    },
    questions: {
        type: [Object],
    },
    document: {
        type: String
    },
    expirationDate: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    },
<<<<<<< HEAD
=======
    expirationDate: Date,
    createdAt: {
        type: Date,
        default: Date.now()
    }
>>>>>>> c7d0be25c2fc3a553fe4880b76c326fd5046fa95
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;