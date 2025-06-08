const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth')

// POST /transactions - Fazer uma nova transação
router.post('/create-category', auth, categoryController.create);

module.exports = router;