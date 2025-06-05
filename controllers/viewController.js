const sequelize = require('../config/database');

// Faz a consulta da view através da query e exporta
exports.getBalanceSummary = async (req, res) => {
  try {
    const viewbalance = await ViewBalance.findAll();
    res.status(200).json(viewbalance);
  } catch (error) {
    console.error('Erro ao buscar o resumo de saldo:', error);
    res.status(500).json({ error: 'Erro interno ao buscar resumo de saldo' });
  }
};
