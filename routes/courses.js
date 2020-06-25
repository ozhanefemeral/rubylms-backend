const express = require('express');
const route = express.Router();
const Course = require('../models/Course');
const Teacher = require('../models/Teacher');

route.post('/', async (req, res) => {
    const teacher = await Teacher.findById(req.body.teacher);
    Course.create(req.body)
        .then(async course => {
            teacher.courses.push(course);
            await teacher.save();
            res.send(course)
        })
})

route.get('/:id', (req, res) => {
    const id = req.params.id
    Course.findById(id)
        .then(course => {
            res.send(course)
        })
})

module.exports = route;