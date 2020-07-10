const express = require('express');
const route = express.Router();
const upload = require('../middlewares/upload');
const s3 = require('../s3/index')

route.post('/', upload.single('document'), async (req, res) => {
    res.send(req.file.key);
})

route.get('/:filename', async (req, res) => {
    const { filename } = req.params

    const params = {
        Bucket: process.env.UPLOADS_BUCKET,
        Key: filename
    }

    s3.getObject(params, function (err, data) {
        console.log(data);
        res.writeHead(200, { 'Content-Type': data.ContentType });
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
    });
})

module.exports = route;