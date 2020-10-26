const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/keys');
const history = require('connect-history-api-fallback');

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.connect(config.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("connected to mongoDB"));

app.use(history());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/files', require('./routes/files'));
app.use('/api/schools', require('./routes/schools'));
app.use('/api/solutions', require('./routes/solutions'));
app.use('/api/students', require('./routes/students'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/test', require('./routes/test'));

app.use(express.static(__dirname + '/public/'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});