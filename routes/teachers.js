const express = require('express');
const route = express.Router();
const Teacher = require('../models/Teacher');

route.post('/', (req, res) => {
    Teacher.create(req.body)
        .then(teacher => {
            res.send(teacher)
        })
})

route.get('/:id', (req, res) => {
    const id = req.params.id
    Teacher.findById(id)
        .then(teacher => {
            res.send(teacher)
        })
})

module.exports = route;