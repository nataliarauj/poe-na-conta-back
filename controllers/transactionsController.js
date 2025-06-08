const Transaction = require('../models/Transaction');

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