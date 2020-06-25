const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schoolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

const School = mongoose.model('School', schoolSchema);

module.exports = School;