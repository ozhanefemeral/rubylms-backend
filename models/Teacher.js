const mongoose = require('mongoose');
const Schema = mongoose.Schema

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School'
    },
    courses: {
        type: [Schema.Types.ObjectId],
        ref: 'Course'
    }
})

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;