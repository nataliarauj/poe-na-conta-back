const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define o modelo 'View' que representa a view 'balancesummary' no bd
const View = sequelize.define('View', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: 'id'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name'
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

module.exports = View;