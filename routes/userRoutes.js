const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /users - Buscar todos os usuários
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno ao buscar usuários' });
  }
});

// GET /users/:id - Buscar um usuário específico
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao buscar usuário' });
  }
});

// POST /users - Criar um novo usuário
router.post('/users', async (req, res) => {
  try {
    if (!req.body.name || !req.body.useremail || !req.body.passwordhash) {
      return res.status(400).json({ 
        error: 'Nome, email e senha são obrigatórios' 
      });
    }

    const newUser = await User.create({
      name: req.body.name,
      useremail: req.body.useremail,
      passwordhash: req.body.passwordhash
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao criar usuário' });
  }
});

// PUT /users/:id - Atualizar um usuário
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.useremail) user.useremail = req.body.useremail;
    if (req.body.passwordhash) user.passwordhash = req.body.passwordhash;

    await user.save();
    
    res.status(200).json(user);

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar usuário' });
  }
});

// DELETE /users/:id - Remover um usuário
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await user.destroy();
    
    res.status(204).end();
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    res.status(500).json({ error: 'Erro interno ao remover usuário' });
  }
});

module.exports = router;