'use strict';
const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");


const dm = require('./datamanager.js');
const ut = require('./utils.js');

const router = express.Router();

router.post('/messages', bodyParser.urlencoded({ extended: false }), function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(dm.writeMessage(req.body)));
});

router.get('/messages', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(dm.loadMessages(req.query)));
});

router.get(['/','/index.html'], function(req, res) {
  let file = 'static/index.html';
  fs.readFile(file, function (err, data) {
    res.end(data);
  });
});

module.exports = router;
