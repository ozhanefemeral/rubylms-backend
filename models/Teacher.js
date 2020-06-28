const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

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
    },
    phone: String,
    password: String
})

teacherSchema.pre('save', function (next) {
    if (this.__v === 0) {
        bcrypt.hash(this.password, 10, (err, enc) => {
            console.log(enc);
            this.password = enc;
            next();
        })
    } else {
        next();
    }

})

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;