const sequelize = require('../config/database');
const View = require('../models/View');

// Faz a consulta da view através da query e exporta
exports.getBalanceSummary = async (req, res) => {
  try {
    const [results, metadata] = await sequelize.query('SELECT * FROM balancesummary');
    res.json(results);
  } catch (error) {
    console.error('Erro ao buscar resumo de saldo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
