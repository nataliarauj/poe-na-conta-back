const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Rota para buscar todas as transações e retornar no formato json
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json({ error: 'Erro interno ao buscar transações' });
  }
});

module.exports = router;
