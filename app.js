const express = require('express');
const app = express();

require('dotenv').config();
require('./config/database');

app.use(express.json());

module.exports = app;