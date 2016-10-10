'use strict'

//const http = require('http');
const express = require('express');
const fs = require('fs');

const dm = require('./datamanager.js');
const router = require('./router.js');

var app = express();

app.use(router);
app.use(express.static('static'));
app.use(function (req, res) {
  res.status(404).sendFile(__dirname + '/static/404.html');
});
// app.use(function(req, res) {
//   let file = 'static/404.html';
//   fs.readFile(file, function (err, data) {
//     res.end(data);
//   });
// });

app.listen(8080);
