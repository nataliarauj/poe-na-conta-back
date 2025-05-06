const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define o modelo 'ViewBalance' que representa a view 'balancesummary' no bd
const ViewBalance = sequelize.define('ViewBalance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id'
  },
  debts: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'debts'
  },
  gains: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'gains'
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'total'
  }
}, {
  tableName: 'balancesummary', 
  timestamps: false,
  freezeTableName: true
});

module.exports = ViewBalance;