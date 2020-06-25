const express = require('express');
const route = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');

route.post('/', (req, res) => {
    Student.create(req.body)
        .then(student => {
            res.status(201).send(student)
        })
})

route.post('/:studentId/enroll/:courseId', async (req, res) => {
    const { studentId, courseId } = req.params;
    Student.findById(studentId)
        .then(student => {
            student.courses.push(courseId);
            return student.save();
        })
        .then(student => {
            res.status(201).send(student);
        })
})

route.get('/:studentId', (req, res) => {
    const { studentId } = req.params
    Student.findById(studentId)
        .then(student => {
            res.send(student)
        })
})

module.exports = route;