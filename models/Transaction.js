const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define o modelo 'Transaction' que representa a tabela 'transactions' no bd
const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'client_id'
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'category'
  },
  balance: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    field: 'balance'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'title'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'description'
  }
}, {
  tableName: 'transactions',
  timestamps: false
});

module.exports = Transaction;
