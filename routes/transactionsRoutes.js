const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
const auth = require('../middleware/auth')

// POST /transactions - Fazer uma nova transação
router.post('/add-transaction', auth, transactionsController.create);

// PUT /transactions/:id - Atualização de transação
// router.patch('/transactions/:id', transactionsController.update);

// DELETE /transactions/:id - Deletar transação específica
// router.delete('/transactions/:id', transactionsController.delete);

module.exports = router;