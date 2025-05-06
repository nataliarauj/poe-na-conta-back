  const express = require('express');
  const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { and } = require('sequelize');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS
  }
});
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

// POST /users - Criar um novo usuário com verificação de e-mail
router.post('/users', async (req, res) => {
  try {
    const { name, useremail, passwordhash } = req.body;

    if (!name || !useremail || !passwordhash) {
      return res.status(400).json({ 
        error: 'Nome, email e senha são obrigatórios' 
      });
    }

    const existingUser = await User.findOne({ where: { useremail } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordhash, salt);

    const newUser = await User.create({
      name,
      useremail,
      passwordhash: hashedPassword,
      emailVerified: false
    });

    // Gera o token de verificação
    const emailToken = jwt.sign(
      { useremail: newUser.useremail },
      process.env.JWT_EMAIL_SECRET,
      { expiresIn: '20m' }
    );

    const verifyUrl = `http://localhost:5000/api/verify-email?token=${emailToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newUser.useremail,
      subject: 'Confirmação de e-mail - Põe na Conta',
      html: `
        <h3>Olá, ${name}!</h3>
        <p>Obrigado por se cadastrar na <strong>Põe na Conta</strong>.</p>
        <p>Para ativar sua conta, por favor confirme seu e-mail clicando no botão abaixo:</p>
        <p><a href="${verifyUrl}" style="background-color: #163465; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirmar e-mail</a></p>
        <p><em>Este link é válido por 20 minutos.</em></p>
        <hr>
        <p style="font-size: 12px; color: gray;">Este é um e-mail automático, por favor não responda.</p>
      `
    });

    res.status(201).json({ 
      message: 'Usuário criado. Verifique seu e-mail para ativar a conta.'
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao criar usuário' });
  }
});

router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);
    const user = await User.findOne({ where: { useremail: decoded.useremail } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: 'E-mail já verificado.' });
    }

    user.emailVerified = true;
    await user.save();

    res.status(200).json({ message: 'E-mail verificado com sucesso!' });

  } catch (error) {
    console.error('Erro ao verificar e-mail:', error);
    res.status(400).json({ error: 'Token inválido ou expirado.' });
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

    // Verifica se o email foi confirmado
    if (!user.emailVerified) {
      return res.status(403).json({ error: 'E-mail não verificado. Verifique sua caixa de entrada.' });
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