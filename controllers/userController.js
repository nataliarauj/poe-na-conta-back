const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../config/transporter');
require('dotenv').config();
// const secret = process.env.JWT_SECRET;

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno ao buscar usuários' });
  }
};

exports.espUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao buscar usuário' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, useremail, passwordhash } = req.body;

    if (!name || !useremail || !passwordhash) {
      return res.status(400).json({ 
        error: 'Nome, email e senha são obrigatórios.' 
      });
    }

    const existingUser = await User.findOne({ where: { useremail } });
    if (existingUser) {
      return res.status(409).json({ error: 'E-mail já cadastrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordhash, salt);

    const newUser = await User.create({
      name,
      useremail,
      passwordhash: hashedPassword,
      emailVerified: false
    });

    // Gera token com ID do usuário
    const emailToken = jwt.sign(
      { id: newUser.id },
      process.env.JWT_EMAIL_SECRET,
      { expiresIn: '20m' }
    );

    const verifyUrl = `${process.env.URL_VERIFICATION}?token=${emailToken}`;

    const sanitizedName = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: newUser.useremail,
      subject: 'Confirmação de e-mail - Põe na Conta',
      html: `
        <h3>Olá, ${sanitizedName}!</h3>
        <p>Obrigado por se cadastrar na <strong>Põe na Conta</strong>.</p>
        <p>Para ativar sua conta, por favor confirme seu e-mail clicando no botão abaixo:</p>
        <p><a href="${verifyUrl}" style="background-color: #163465; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirmar e-mail</a></p>
        <p><em>Este link é válido por 20 minutos.</em></p>
        <hr>
        <p style="font-size: 12px; color: gray;">Este é um e-mail automático, por favor não responda.</p>
      `
    });

    res.status(201).json({ 
      message: 'Usuário criado com sucesso. Verifique seu e-mail para ativar a conta.'
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao criar usuário.' });
  }
};

exports.email = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token de verificação não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_EMAIL_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    if (user.emailVerified) {
      return res.status(409).json({ message: 'E-mail já foi verificado anteriormente.' });
    }

    user.emailVerified = true;
    await user.save();

    return res.status(200).json({ message: 'E-mail verificado com sucesso!' });

  } catch (error) {
    console.error('Erro na verificação de e-mail:', error);

    if (error.name === 'TokenExpiredError') {
      return res.status(410).json({ error: 'Token expirado. Solicite um novo e-mail de verificação.' });
    }

    return res.status(400).json({ error: 'Token inválido.' });
  }
};

exports.updUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

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
};

exports.delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await user.destroy();

    res.status(204).end();
  } catch (error) {
    console.error('Erro ao remover usuário:', error);
    res.status(500).json({ error: 'Erro interno ao remover usuário' });
  }
};

exports.login = async (req, res) => {
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
      process.env.JWT_SECRET,
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
}