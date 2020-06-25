const mongoose = require('mongoose');
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    },
    teacher: {
        type: [Schema.Types.ObjectId],
        ref: 'Teacher'
    },
    tasks: {
        type: [Schema.Types.ObjectId],
        ref: 'Task'
    },
    documents: {
        type: [String]
    }
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;