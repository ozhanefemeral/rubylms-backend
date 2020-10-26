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

route.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  Comment.findByIdAndDelete(id)
  .then(() => {
    res.sendStatus(200)
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
      res.send(populated.comments)
    })
})

module.exports = route;