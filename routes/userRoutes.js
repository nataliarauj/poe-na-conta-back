const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// POST /users - Criar um novo usuário com verificação de e-mail
router.post('/users', userController.createUser);

// POST /login - Login de usuário
router.post('/login', userController.login);

// POST /users/forgot-pass - Solicita alteração da senha
router.post('/users/forgot-pass', userController.forgotPass);

// GET /verify-email - Valida o email cadastrado
router.get('/verify-email', userController.email);

// GET /users/verify-email - Verifica o email 
router.get('/users/verify-email', userController.verifyEmail);

// UPDATE /users/reset-pass - Ateração da senha
router.patch('/users/reset-pass', userController.resetPassword);

//****// Rotas protegidas //****//

// GET /users/me - Retornar os dados do usuário
router.get('/users/me', auth, userController.searchUser);

// DELETE /users/me - Remover o usuário
router.delete('/users/me', auth, userController.delete);

// UPDATE /users/update-name - Atualiza nome do usuário
router.patch('/users/update-name', auth, userController.updateName);

// UPDATE /users/update-password - Atualiza senha do usuário
router.patch('/users/update-password', auth, userController.updPass);

// UPDATE /users/update-email - Alteração do email
router.patch('/users/update-email', auth, userController.requestEmailUpdate);

module.exports = router;