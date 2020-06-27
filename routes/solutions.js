const express = require('express');
const route = express.Router();
const Task = require('../models/Task');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Solution = require('../models/Solution');

route.post('/', (req, res) => {
    Solution.create(req.body)
        .then(solution => {
            res.send(solution);
        })
})

route.get('/', (req, res) => {
    const { taskId } = req.query
    Solution.find({ task: taskId })
        .then(solutions => {
            res.send(solutions)
        })
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    Solution.findById(id)
        .then(solution => {
            res.send(solution)
        })
})

module.exports = route;