const express = require('express');
const router = express.Router();
const viewController = require('../controllers/viewController');
const auth = require('../middleware/auth')

// Rota para buscar o resumo de saldo dos clientes
router.get('/balanceTotal', auth, viewController.getBalanceTotal);

router.get('/balanceGains', auth, viewController.getBalanceGains);

router.get('/balanceDebts', auth, viewController.getBalanceDebts);

router.get('/balanceCategories', auth, viewController.getBalanceCategories);

router.get('/balanceAllDebts', auth, viewController.getBalanceAllDebts);

router.get('/balanceAllGains', auth, viewController.getBalanceAllGains);

module.exports = router;