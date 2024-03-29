const qs = require('qs');
const express = require('express');
const route = express.Router();
const School = require('../models/School');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Course = require('../models/Course');

const helper = require('../helper');

route.post('/', (req, res) => {
    School.create(req.body)
        .then(school => {
            res.send(school)
        })
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    School.findById(id)
        .then(school => {
            res.send(school)
        })
})

route.get('/:id/students', (req, res) => {
    const { id } = req.params

    School.findById(id)
        .then(school => {
            return Student.find({ school: school._id }).select(['name', '_id'])
        })
        .then(students => {
            res.send(students);
        })
})

route.get('/:id/teachers', (req, res) => {
    const { id } = req.params
    console.log(id);

    School.findById(id)
        .then(school => {
            return Teacher.find({ school: school._id }).select(['name', '_id'])
        })
        .then(teachers => {
            res.send(teachers);
        })
})

route.get('/:id/courses', (req, res) => {
    const { id } = req.params;

    const { select, populate } = req.query;
    const popArray = helper.populateStringToArray(populate);
    const selectArray = helper.populateStringToArray(select);

    School.findById(id)
        .then(school => {
            return Course.find({ school: school._id })
                .select(selectArray)
                .populate(popArray)
        })
        .then(courses => {
            res.send(courses);
        })
})

module.exports = route;