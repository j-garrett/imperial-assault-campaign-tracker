const express = require('express');
const path = require('path');

const db = require('./schema.js');
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected.connection is go');
});

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '../client')));

app.listen(port, () => {
  console.log('We are connected on port ', port);
});
