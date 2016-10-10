'use strict'

//const http = require('http');
const express = require('express');
const fs = require('fs');
const bodyParser = require("body-parser");

const dm = require('./datamanager.js');
const router = require('./router.js');

var app = express();

dm.initDBMessages();
setInterval(function () {
  dm.saveDB();
}, 5000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router.rout);
app.use(express.static('static'));
app.use(function(req, res) {
  let file = 'static/404.html';
  fs.readFile(file, function (err, data) {
    res.end(data);
  });
});

app.listen(8080);
