const express = require('express');
const route = express.Router();
const Task = require('../models/Task');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Solution = require('../models/Solution');
const verifyToken = require('../middlewares/verifyToken');

const qs = require('qs');

route.post('/', verifyToken, (req, res) => {
    Solution.create(req.body)
        .then(solution => {
            res.send(solution);
        })
})

route.get('/find', verifyToken, (req, res) => {
    const { query } = req.query;
    const queryObj = qs.parse(query);
    
    console.log(queryObj);

    Solution.find(queryObj)
        .then(solutions => {
            res.send(solutions)
        })
})

route.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params
    Solution.findById(id)
        .then(solution => {
            res.send(solution)
        })
})

module.exports = route;