const Transaction = require('../models/Transaction');

// Criar
exports.create = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar transação', details: err.message });
  }
};

// Atualizar
exports.update = async (req, res) => {
  try {
    const [updated] = await Transaction.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const transaction = await Transaction.findByPk(req.params.id);
      res.json(transaction);
    } else {
      res.status(404).json({ error: 'Transação não encontrada' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar transação' });
  }
};

// Deletar
exports.delete = async (req, res) => {
  try {
    const transaction = await Transaction.destroy({
      where: { id: req.params.id }
    });
    if (transaction) {
      res.json({ message: 'Transação deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Transação não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar transação' });
  }
};