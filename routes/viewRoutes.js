const express = require('express');
const router = express.Router();
const View = require('../models/View');

// Rota para buscar o resumo de saldo dos clientes
router.get('/balancesummary', async (req, res) => {
  try {
    const view = await View.findAll();
    res.status(200).json(view);
  } catch (error) {
    console.error('Erro ao buscar o resumo de saldo:', error);
    res.status(500).json({ error: 'Erro interno ao buscar resumo de saldo' });
  }
});

module.exports = router;