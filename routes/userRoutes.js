const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para buscar todos os usuários e retornar no formato json
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno ao buscar usuários' });
  }
});

module.exports = router;
