const Category = require('../models/Category')

exports.create = async(req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: 'Preencha o nome da categoria' });
    }

    const client_id = req.user.id;

    const count = await Category.count({ where: { client_id } });

    if (count >= 5 && !req.user.premium) {
      return res.status(403).json({ message: 'Usuários free só podem ter até 5 categorias' });
    }

    const categoryBody = {
      name,
      client_id
    };

    await Category.create(categoryBody);

    res.status(201).json({
      message: 'Categoria criada com sucesso'
    });

  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro interno ao criar categoria.' });
  }
}