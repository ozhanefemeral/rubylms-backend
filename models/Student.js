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
    if (this.__v == 0) {
        bcrypt.hash(this.password, 10)
            .then(result => {
                this.password = result;
                return this.save();
            })
            .then(() => {
                next();
            })
    }
    next();
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
