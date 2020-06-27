const express = require('express');
const route = express.Router();
const Task = require('../models/Task');
const Course = require('../models/Course');

const upload = require('../middlewares/upload');

route.post('/', upload.single('document'), async (req, res) => {
    let { task } = req.body;
    task = JSON.parse(task);

    const course = await Course.findById(task.course);

    req.body.document = req.file.location

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