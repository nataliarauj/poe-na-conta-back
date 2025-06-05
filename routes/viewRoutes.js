const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');

// Rota para buscar o resumo de saldo dos clientes
router.get('/balancesummary', viewController.getBalanceSummary);

module.exports = router;