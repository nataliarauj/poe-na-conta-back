const { Transaction } = require('../models');

//Criar
exports.create = async(req, res) => {
  const {category_id, balance, title, description, createdat} = req.body;
  try{
    
    if(!category_id || !balance || !title){
      return res.status(400).json({message: 'Preencha todos os campos obrigatórios'})
    }
    const client_id = req.user.id
    
    const transactionBody ={
      title,
      category_id,
      balance,
      client_id
    }
    
    if(description){
      transactionBody.description = description
    }

    if(createdat){
      transactionBody.createdat = createdat
    }

    const newTransaction = await Transaction.create(transactionBody)
    
    res.status(201).json({ 
      message: 'Transação criada com sucesso'
    });

  }catch (error) {
    console.error('Erro ao criar transação:', error);
    res.status(500).json({ error: 'Erro interno ao criar transação.' });
  }
}

//Atualizar
exports.update = async (req, res) => {
  const { id } = req.params;
  const { category_id, balance, title, description, createdat } = req.body;

  try {
    if (!category_id || !balance || !title) {
      return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
    }

    const client_id = req.user.id;

    const transaction = await Transaction.findOne({
      where: { id, client_id }
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada!' });
    }

    const updateData = {
      title,
      category_id,
      balance,
    };

    if (description !== undefined) updateData.description = description;
    if (createdat !== undefined) updateData.createdat = createdat;

    await transaction.update(updateData);

    res.status(200).json({ message: 'Transação atualizada com sucesso!' });

  } catch (error) {
    console.error('Erro ao atualizar transação: ', error);
    res.status(500).json({ error: 'Erro interno ao atualizar transação' });
  }
};

//Deletar
exports.delete = async (req, res) => {
  const { id } = req.params;
  const client_id = req.user.id;

  try {
    const transaction = await Transaction.findOne({
      where: { id, client_id }
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transação não encontrada!' });
    }

    await transaction.destroy();

    res.status(200).json({ message: 'Transação deletada com sucesso!' });

  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    res.status(500).json({ error: 'Erro interno ao deletar transação' });
  }
};
