const express = require('express');
const route = express.Router();
const Teacher = require('../models/Teacher');
const Course = require('../models/Course');

route.post('/', (req, res) => {
    Teacher.create(req.body)
        .then(teacher => {
            res.send(teacher)
        })
})

route.get('/:id', (req, res) => {
    const { id } = req.params;
    const { populate } = req.query;

    if (populate == 'true') {
        Teacher.findById(id).populate({ path: 'courses', model: 'Course', select: ['_id', 'name'] })
            .then(teacher => {
                res.send(teacher)
            })
    } else {
        Teacher.findById(id)
            .then(teacher => {
                res.send(teacher)
            })
    }

})

route.get('/:id/courses', (req, res) => {
    const {id} = req.params
    Teacher.findById(id)
        .then(teacher => {
            return Course.find({ teacher }).select(['_id', 'name'])
        })
        .then(courses => {
            res.send(courses)
        })
})

module.exports = route;