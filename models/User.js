const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Transaction = require('./Transaction');

// Define o modelo 'User' que representa a tabela 'clients' no bd
const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name'
    },
    useremail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'useremail'
    },
    passwordhash: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'passwordhash'
    },
    premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      field: 'premium'
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'createdAt'
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'emailVerified'
    }
  }, {
    tableName: 'clients',
    timestamps: false
  });
  
  
User.hasMany(Transaction, { foreignKey: 'client_id' });

module.exports = User;
