const express = require('express');
const app = express();
app.set('json spaces', 2);

require('dotenv').config();

// Importação das rotas que vão estar disponíveis sob o prefixo '/api'
const userRoutes = require('./routes/userRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');
const viewRoutes = require('./routes/viewRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
// Middlewares
app.use(express.json());

// Registro das rotas
app.use('/api', userRoutes);
app.use('/api', transactionsRoutes);
app.use('/api', viewRoutes);
app.use('/api', categoryRoutes)

module.exports = app;