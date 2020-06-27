const mongoose = require('mongoose');
const Schema = mongoose.Schema

const studentSchema = new Schema({
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
    },
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;