const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const auth = require('../middleware/auth')

// POST /transactions/create - Criar uma nova transação
router.post('/transactions/create', auth, transactionsController.create);

// PUT /transactions/update - Atualização de transação
router.put('/transactions/update/:id', auth, transactionsController.update);

// DELETE /transactions/delete - Deletar transação específica
router.delete('/transactions/delete/:id', auth, transactionsController.delete);

module.exports = router;