const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./server/routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Trades.',
}));

module.exports = app;
