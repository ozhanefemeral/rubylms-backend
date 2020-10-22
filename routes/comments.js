const express = require('express');
const route = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');
const helper = require('../helper');

const verifyToken = require('../middlewares/verifyToken');
const Solution = require('../models/Solution');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

route.post('/', verifyToken, (req, res) => {
  const { comment } = req.body;
  Comment.create(comment)
    .then(comment => {
      res.send(comment)
    })
})

route.get('/', verifyToken, (req, res) => {
  const { id, model } = req.query;
  mongoose.model(model)
    .findById(id)
    .then(doc => {
      return doc.populate('comments').execPopulate()
    })
    .then(populated => {
      console.log(populated);
      res.send(populated.comments)
    })
  // .then(populated => {
  //   console.log(populated);
  //   const { message, by } = populated;
  //   res.send({ message, by })
  // })
})

module.exports = route;