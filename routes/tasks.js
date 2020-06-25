const express = require('express');
const route = express.Router();
const Task = require('../models/Task');
const Course = require('../models/Course');

route.post('/', async (req, res) => {
    const course = await Course.findById(req.body.course);
    Task.create(req.body)
        .then(async task => {
            course.tasks.push(task);
            await course.save();
            res.send(task);
        })
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    Task.findById(id)
        .then(task => {
            res.send(task)
        })
})

module.exports = route;