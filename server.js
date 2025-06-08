require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
require('./middleware/periodicDeletion');
const PORT = process.env.PORT || 5000;

// Função assíncrona para iniciar o servidor e conectar ao banco de dados
async function start() {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com o PostgreSQL.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
  }
}

start();
