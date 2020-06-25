const express = require('express');
const route = express.Router();
const School = require('../models/School');

route.post('/', (req, res) => {
    School.create(req.body)
        .then(school => {
            res.send(school)
        })
})

route.get('/:id', (req, res) => {
    const id = req.params.id
    School.findById(id)
        .then(school => {
            res.send(school)
        })
})


module.exports = route;