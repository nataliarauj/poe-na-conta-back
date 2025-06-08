const sequelize = require('../config/database');
const ViewBalance = require('../models/ViewBalance')
const ViewCategory = require('../models/ViewCategory')
const viewDebtsNGains = require('../models/ViewDebtsNGains')
// Faz a consulta da view através da query e exporta
exports.getBalanceDebts = async (req, res) => {
  try {
    const viewbalance = await ViewBalance.findByPk(req.user.id);

    if(!viewbalance){
      res.status(404).json({message: 'Usuário não possui nenhuma view'})
    }

    res.status(200).json(viewbalance.debts);
  } catch (error) {
    console.error('Erro ao buscar o resumo de saldo:', error);
    res.status(500).json({ error: 'Erro interno ao buscar resumo de saldo' });
  }
};

exports.getBalanceGains = async (req, res) => {
  try {
    const viewbalance = await ViewBalance.findByPk(req.user.id);

    if(!viewbalance){
      res.status(404).json({message: 'Usuário não possui nenhum gasto'})
    }

    res.status(200).json(viewbalance.gains);
  } catch (error) {
    console.error('Erro ao buscar o resumo de saldo:', error);
    res.status(500).json({ error: 'Erro interno ao buscar resumo de saldo'});
  }
};

exports.getBalanceTotal = async (req, res) => {
  try {
    const viewbalance = await ViewBalance.findByPk(req.user.id);

    if(!viewbalance){
      res.status(404).json({message: 'Usuário não possui nenhuma view'})
    }

    res.status(200).json(viewbalance.total);
  } catch (error) {
    console.error('Erro ao buscar o resumo de saldo:', error);
    res.status(500).json({ error: 'Erro interno ao buscar resumo de saldo' });
  }
};

exports.getBalanceCategories = async (req, res) => {
  try{
    
    const categories = await ViewCategory.findAll({
      attributes: ['category', 'balance'],
      where: { id: req.user.id }
    });

    if(!categories){
      res.status(404).json({message: 'Nenhuma categoria encontrada'})
    }
    res.status(200).json(categories)

  }catch(error){
    console.error('Erro ao buscar o resumo de saldo por categoria:', error);
    res.status(500).json({error: 'Erro interno ao buscar o saldo'})
  }
}

exports.getBalanceAllDebts= async (req, res) => {
  try{
    
    const results = await viewDebtsNGains.findAll({
      attributes: ['title', 'balance', 'createdat'],
      where: {
        id: req.user.id,
        balance: { [Op.lt]: 0}
      }
    });
    
    if(!results){
      res.status(404).json({message: 'Nenhum gasto registrado'})
    };

    res.status(200).json(results);
  }catch(error){
    console.error('Erro ao buscar as transações', error)
    res.status(500).json({ error: 'Erro interno ao buscar transações' });

  }
}

exports.getBalanceAllGains= async (req, res) => {
  try{
    
    const results = await viewDebtsNGains.findAll({
      attributes: ['title', 'balance', 'createdat'],
      where: {
        id: req.user.id,
        balance: { [Op.gt]: 0}
      }
    });
    
    if(!results){
      res.status(404).json({message: 'Nenhum ganho registrado'})
    };

    res.status(200).json(results);
  }catch(error){
    console.error('Erro ao buscar as transações', error)
    res.status(500).json({ error: 'Erro interno ao buscar transações' });

  }
}