const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;
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
    const { name, useremail, passwordhash } = req.body;

    if (!name || !useremail || !passwordhash) {
      return res.status(400).json({ 
        error: 'Nome, email e senha são obrigatórios' 
      });
    }

    // Gerar o hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordhash, salt);

    const newUser = await User.create({
      name,
      useremail,
      passwordhash: hashedPassword // salvando o hash no banco
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

    if (req.body.passwordhash) {
      const salt = await bcrypt.genSalt(10);
      user.passwordhash = await bcrypt.hash(req.body.passwordhash, salt);
    }

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

// POST /login - Login de usuário
router.post('/login', async (req, res) => {
  const { useremail, passwordhash } = req.body;

  if (!useremail || !passwordhash) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const user = await User.findOne({ where: { useremail } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(passwordhash, user.passwordhash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Criar o Token JWT
    const token = jwt.sign(
      { id: user.id, useremail: user.useremail },
      secret,
      { expiresIn: '2h' }
    );

    res.status(200).json({ 
      message: 'Login realizado com sucesso', 
      token 
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

module.exports = router;