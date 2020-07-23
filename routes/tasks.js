const express = require('express');
const route = express.Router();
const Task = require('../models/Task');
const Course = require('../models/Course');

const upload = require('../middlewares/upload');
const qs = require('qs');

route.post('/', async (req, res) => {
    const taskBody = req.body.task
    const course = await Course.findById(taskBody.course);

    Task.create(taskBody)
        .then(async task => {
            course.tasks.push(task);
            await course.save();
            res.send(task);
        })
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    const { populate } = req.query;

    const popArray = populateStringToArray(populate);

    console.log(popArray);

    Task.findById(id)
        .populate(popArray)
        .then(task => {
            res.send(task)
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