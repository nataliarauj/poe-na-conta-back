const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const auth = require('../middleware/auth')

// POST /transactions/create - Criar uma nova transação
router.post('/transactions/create', auth, transactionsController.create);

// GET /transactions/list-all-transactions - Lista todas as transações
router.get('/transactions/list-all-transactions', auth, transactionsController.listAll);

// PUT /transactions/update - Atualização de transação
router.patch('/transactions/update', auth, transactionsController.update);

// DELETE /transactions/delete - Deletar transação específica
router.delete('/transactions/delete', auth, transactionsController.delete);

module.exports = router;