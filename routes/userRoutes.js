const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// POST /users - Criar um novo usuário com verificação de e-mail
router.post('/users', userController.createUser);

// Verifica o email do usuário que foi criado
router.get('/verify-email', userController.email);

// POST /login - Login de usuário
router.post('/login', userController.login);

// Rotas protegidas

// GET /users - Buscar todos os usuários
router.get('/users', auth, userController.getUsers);

// GET /users/:id - Buscar um usuário específico
router.get('/users/me', auth, userController.espUser);

// PUT /users/:id - Atualizar um usuário
router.put('/users/me', auth, userController.updUser);

// DELETE /users/:id - Remover um usuário
router.delete('/users/me', auth, userController.delete);

module.exports = router;