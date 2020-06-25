const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3000 || process.env.PORT
const mongoose = require('mongoose');
const config = require('./config/keys');

mongoose.connect(config.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("connected to mongoDB"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/schools', require('./routes/schools'));
app.use('/api/students', require('./routes/students'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/solutions', require('./routes/solutions'));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});