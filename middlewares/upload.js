const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../s3/index')

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.UPLOADS_BUCKET,
        contentType: function (req, file, cb) {
            cb(null, 'application/pdf');
        },
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + file.originalname)
        }
    })
});

module.exports = upload;