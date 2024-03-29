const express = require('express');
const route = express.Router();
const Solution = require('../models/Solution');
const verifyToken = require('../middlewares/verifyToken');

const qs = require('qs');

route.post('/', verifyToken, (req, res) => {
    Solution.create(req.body)
        .then(solution => {
            return solution.populate({ path: 'task', model: 'Task', select: ['name', 'solutions'], populate: { path: 'solutions', model: 'Solution', select: ['mark', 'duration'] } })
        })
        .then(solution => {
            res.send(solution);
        })
})

route.patch('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { solution } = req.body;

    Solution.update({ _id: id }, solution)
        .then(s => {
            res.send(s)
        });
})

route.get('/find', verifyToken, (req, res) => {
    const { query } = req;
    const queryObj = qs.parse(query);

    Solution.find(queryObj)
        .then(solutions => {
            res.send(solutions)
        })
})

route.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params

    const { select, populate } = req.query;
    const popArray = populateStringToArray(populate);

    Solution.findById(id)
        .select(select)
        .populate(popArray)
        .then(solution => {
            res.send(solution)
        })
})

route.patch('/:id', verifyToken, (req, res) => {
    const { id } = req.params

    Solution.findByIdAndUpdate(id, { $set: req.body })
        .then(solution => {
            res.send(solution)
        })
})

const populateStringToArray = (populateString) => {
    const popObject = qs.parse(populateString);
    let popArray = [];

    for (const key in popObject) {
        if (popObject.hasOwnProperty(key)) {
            const element = popObject[key];
            popArray.push(element)
        }
    }

    return popArray;
}

module.exports = route;