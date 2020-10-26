const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const Student = require('../models/Student')
const Teacher = require('../models/Teacher')

route.post('/login/student', (req, res) => {
  const { phone, password } = req.body;
  console.log(phone, password);
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
    .select("-courses -comments")
    .then(teacher => {
      return teacher.login(password)
    })
    .then(teacher => {
      delete teacher.password;
      const token = {
        id: teacher._id
      };

      jwt.sign(token, '5489d9845m', (err, token) => {
        res.json({ teacher, token, school: teacher.school });
      });
    })
})

module.exports = route;