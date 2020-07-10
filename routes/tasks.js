const express = require('express');
const route = express.Router();
const Task = require('../models/Task');
const Course = require('../models/Course');

const upload = require('../middlewares/upload');
const qs = require('qs');

route.post('/', async (req, res) => {
    const taskBody = req.body.task
    const course = await Course.findById(taskBody.course);

    Task.create(taskBody)
        .then(async task => {
            course.tasks.push(task);
            await course.save();
            res.send(task);
        })
})

route.get('/:id', (req, res) => {
    const { id } = req.params

    if (req.query[0] != undefined) {
        const query = qs.parse(req.query[0]);
        let queryArray = [];

        for (const key in query) {
            if (query.hasOwnProperty(key)) {
                const element = query[key];
                queryArray.push(element)
            }
        }

        Task.findById(id).populate(queryArray)
            .then(task => {
                res.send(task)
            })
    } else {
        Task.findById(id)
            .then(task => {
                res.send(task)
            })
    }
})

module.exports = route;