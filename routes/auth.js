const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const Student = require('../models/Student')
const Teacher = require('../models/Teacher')

route.post('/login/student', (req, res) => {
    const { phone, password } = req.body;
    Student.findOne({ phone })
        .then(student => {
            console.log(student);

            bcrypt.compare(password, student.password, (err, same) => {
                if (same) {
                    const token = {
                        id: student._id
                    }
                    jwt.sign(token, '5489d9845m', (err, token) => {
                        res.json({ token, studentId: student._id });
                    });
                } else {
                    res.sendStatus(400);
                }
            });

        })
})

route.post('/login/teacher', (req, res) => {
    const { phone, password } = req.body;

    Teacher.findOne({ phone })
        .then(teacher => {
            bcrypt.compare(password, teacher.password, (err, same) => {
                if (same) {
                    const token = {
                        id: teacher._id
                    };

                    jwt.sign(token, '5489d9845m', (err, token) => {
                        res.json(token);
                    });
                } else {
                    res.sendStatus(400);
                }
            });
        })
})



module.exports = route;