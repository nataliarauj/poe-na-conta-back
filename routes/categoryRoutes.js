const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth')

// POST - Fazer uma nova transação
router.post('/create-category', auth, categoryController.create);

// GET - Listar todas as categorias
router.get('/list-all-categories', auth, categoryController.listAll);

// PATCH - Atualizar uma categoria
router.patch('/update-category', auth, categoryController.update);

// DELETE - Deletar uma categoria
router.delete('/delete-category', auth, categoryController.delete);

module.exports = router;