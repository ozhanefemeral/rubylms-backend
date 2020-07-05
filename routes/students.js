const express = require('express');
const route = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');
const qs = require('qs');

const verifyToken = require('../middlewares/verifyToken');
const Solution = require('../models/Solution');

route.post('/', verifyToken, (req, res) => {
    Student.create(req.body)
        .then(student => {
            res.status(201).send(student)
        })
})

route.post('/:studentId/enroll/:courseId', verifyToken, async (req, res) => {
    const { studentId, courseId } = req.params;
    Student.findById(studentId)
        .then(student => {
            student.courses.push(courseId);
            return student.save();
        })
        .then(student => {
            res.status(201).send(student);
        })
})

route.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params
    const { populate } = req.query;

    const popArray = populateStringToArray(populate);

    console.log(popArray);
    

    Student.findById(id)
        .populate(popArray)
        .then(student => {
            console.log(student);
            res.send(student)
        })
})

route.get('/:id/solutions', verifyToken, (req, res) => {
    const { id } = req.params
    const { select, populate } = req.query;

    console.log(select);

    const popArray = populateStringToArray(populate);

    Solution.find({ student: id })
        .select(select)
        .populate(popArray)
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