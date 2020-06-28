const express = require('express');
const route = express.Router();

const Course = require('../models/Course');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const upload = require('../middlewares/upload');

route.post('/', async (req, res) => {
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

route.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { students } = req.body;

    Course.findById(id)
        .then(async course => {
            let studentsMerged = course.students.concat(students);
            let promises = []
            students.forEach(st => {
                promises.push(Student.findOneAndUpdate({ _id: st }, { $push: { "courses": course } }))
            });

            await Promise.all(promises)

            course.students = studentsMerged;

            await course.save();
            res.send(course)
        })
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    const { populate } = req.query;

    if (populate) {
        const populateObject = {
            path: 'tasks',
            model: 'Task',
            select: ['_id', 'name', 'responsibles', 'solutions'],
            populate: {
                path: 'solutions',
                model: 'Solution',
                select: ['mark'],
            }
        };

        Course.findById(id)
            .populate(populateObject)
            .populate({ path: 'students', model: 'Student', select: ['_id', 'name'] })
            .populate({ path: 'teachers', model: 'Teacher', select: ['_id', 'name'] })
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

route.post('/:id/upload', upload.single('document'), (req, res) => {
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