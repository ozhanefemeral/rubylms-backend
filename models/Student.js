const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

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
    phone: String,
    password: String
})


studentSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, enc) => {
        this.password = enc;
        next();
    })
})


const Student = mongoose.model('Student', studentSchema);

module.exports = Student;