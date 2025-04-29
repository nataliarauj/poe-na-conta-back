const express = require('express');
const router = express.Router();
const ViewBalance = require('../models/ViewBalance');

// Rota para buscar o resumo de saldo dos clientes
router.get('/balancesummary', async (req, res) => {
  try {
    const viewbalance = await ViewBalance.findAll();
    res.status(200).json(viewbalance);
  } catch (error) {
    console.error('Erro ao buscar o resumo de saldo:', error);
    res.status(500).json({ error: 'Erro interno ao buscar resumo de saldo' });
  }
});

module.exports = router;