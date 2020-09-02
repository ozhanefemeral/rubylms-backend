const express = require('express');
const route = express.Router();

const { populateStringToArray } = require('../helper/index');

const verifyToken = require('../middlewares/verifyToken');

const qs = require('qs');

route.post('/', verifyToken, (req, res) => {
    Exam.create(req.body)
        .then(exam => {
            res.send(exam);
        })
})

route.patch('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { exam } = req.body;

    Exam.update({ _id: id }, exam)
        .then(e => {
            res.send(e)
        });
})

route.get('/find', verifyToken, (req, res) => {
    const { query } = req.query;
    const queryObj = qs.parse(query);

    Exam.find(queryObj)
        .then(exams => {
            res.send(exams)
        })
})

route.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params

    const { select, populate } = req.query;
    const popArray = populateStringToArray(populate);

    Exam.findById(id)
        .select(select)
        .populate(popArray)
        .then(exam => {
            res.send(exam)
        })
})

route.patch('/:id', verifyToken, (req, res) => {
    const { id } = req.params

    Exam.findByIdAndUpdate(id, { $set: req.body })
        .then(exam => {
            res.send(exam)
        })
})

module.exports = route;
