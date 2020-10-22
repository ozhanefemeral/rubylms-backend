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
  teachers: {
    type: [Schema.Types.ObjectId],
    ref: 'Teacher'
  },
  students: {
    type: [Schema.Types.ObjectId],
    ref: 'Student'
  },
  tasks: {
    type: [Schema.Types.ObjectId],
    ref: 'Task'
  },
  documents: {
    type: [String]
  },
  image: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
})

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;