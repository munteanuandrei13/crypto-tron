const express = require('express');
const app = express();
const cryptoRoutes = require('./routes/cryptoRoutes.js');

app.use('/api', cryptoRoutes);

module.exports = app;
