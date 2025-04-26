const express = require('express');
const app = express();

require('dotenv').config();

// Importação das rotas que vão estar disponíveis sob o prefixo '/api'
const userRoutes = require('./routes/userRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');
const viewRoutes = require('./routes/viewRoutes');

// Middlewares
app.use(express.json());

// Registro das rotas
app.use('/api', userRoutes);
app.use('/api', transactionsRoutes);
app.use('/api', viewRoutes);

module.exports = app;