const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const studentRouter = require('./routers/studentRouter');
const staffRouter = require('./routers/staffRouter');
const noticeRouter = require('./routers/noticeRouter');
const resultRouter = require('./routers/resultRouter');
const authRouter = require('./routers/authRouter');

const path = require('path');

const cors = require('cors');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// view image from browser
app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, "./build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// app.get('/', (req, res) => {
//   res.status(200).json('Welcome to MERN Stack server for Madrasha Project');
// });

app.use('/', studentRouter);
app.use('/', staffRouter);
app.use('/', noticeRouter);
app.use('/', resultRouter);
app.use('/', authRouter);

module.exports = app;
