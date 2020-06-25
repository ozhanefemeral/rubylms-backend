const express = require('express');
const route = express.Router();
const Course = require('../models/Course');
const Teacher = require('../models/Teacher');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3')

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.UPLOADS_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
});

route.post('/', async (req, res) => {
    const teacher = await Teacher.findById(req.body.teacher);
    Course.create(req.body)
        .then(async course => {
            teacher.courses.push(course);
            await teacher.save();
            res.send(course)
        })
})

route.get('/:id', (req, res) => {
    const { id } = req.params
    Course.findById(id)
        .then(course => {
            res.send(course)
        })
})

route.post('/:id/upload', upload.single('document'), (req, res) => {
    const { id } = req.params;
    Course.findById(id)
        .then(course => {
            course.documents.push(req.file.filename)
            return course.save();
        })
        .then(() => {
            res.send(req.file.filename);
        })
})

module.exports = route;