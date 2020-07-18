const express = require('express');
const qs = require('qs');
const route = express.Router();

const Course = require('../models/Course');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const upload = require('../middlewares/upload');
const verifyToken = require('../middlewares/verifyToken');

route.post('/', verifyToken, async (req, res) => {
    //TODO 
    // ADD COURSE TO ALL TEACHERS DOCUMENT

    const teacher = await Teacher.findById(req.body.teachers[0]);
    Course.create(req.body)
        .then(async course => {
            teacher.courses.push(course);
            await teacher.save();
            res.send(course)
        })
})

route.patch('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const { course } = req.body;

    Course.update({ _id: id }, course)
        .then(c => {
            res.send(c)
        });
})

route.get('/:id', verifyToken, (req, res) => {
    const { id } = req.params
    const { populate } = req.query;

    const popObject = qs.parse(populate);
    let popArray = [];

    for (const key in popObject) {
        if (popObject.hasOwnProperty(key)) {
            const element = popObject[key];
            popArray.push(element)
        }
    }

    if (populate) {
        Course.findById(id)
            .populate(popArray)
            .then(course => {
                res.send(course)
            })
    } else {
        Course.findById(id)
            .then(course => {
                res.send(course)
            })
    }
})

route.post('/:id/upload', [verifyToken, upload.single('document')], (req, res) => {
    const { id } = req.params;
    Course.findById(id)
        .then(course => {
            course.documents.push(req.file.location)
            return course.save();
        })
        .then(() => {
            res.send(req.file.filename);
        })
})

module.exports = route;