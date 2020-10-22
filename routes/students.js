const express = require('express');
const route = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');
const helper = require('../helper');

const verifyToken = require('../middlewares/verifyToken');
const Solution = require('../models/Solution');
// const Comment = require('../models/Comment');

route.post('/', verifyToken, (req, res) => {
  Student.create(req.body)
    .then(student => {
      res.status(201).send(student)
    })
})

route.post('/:studentId/enroll/', verifyToken, async (req, res) => {
  const { studentId } = req.params;
  const { courses } = req.body;

  let findPromises = [];
  let savePromises = [];

  courses.forEach(c => {
    findPromises.push(Course.findById(c))
  })

  let courseDocs = await Promise.all(findPromises)

  Student.findById(studentId)
    .then(async student => {
      student.courses.push(courses);
      courseDocs.forEach(c => {
        c.students.push(studentId);
        savePromises.push(c.save());
      })
      await Promise.all(savePromises);
      return student.save();
    })
    .then(student => {
      res.status(201).send(student);
    })
})

// route.post('/:studentId/comment', verifyToken, async (req, res) => {
//   const { studentId } = req.params;
//   const { comment } = req.body;

//   Student.findById(studentId)
//     .then(async student => {
//       const newComment = await Comment.create(comment);
//       student.comments.push(newComment);
//     })
// })

route.get('/:id', verifyToken, (req, res) => {
  const { id } = req.params
  const { populate } = req.query;

  const popArray = helper.populateStringToArray(populate);

  Student.findById(id)
    .populate(popArray)
    .then(student => {
      res.send(student)
    })
})

route.get('/:id/solutions', verifyToken, (req, res) => {
  const { id } = req.params
  const { select, populate } = req.query;

  const popArray = helper.populateStringToArray(populate);

  Solution.find({ student: id })
    .select(select)
    .populate(popArray)
    .then(solution => {
      res.send(solution)
    })
})

module.exports = route;