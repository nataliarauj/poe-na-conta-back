const DataTypes = require('sequelize')
const sequelize = require('../config/database')

const viewCategories = sequelize.define('ViewCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id'
    },
    category: {
        type: DataTypes.TEXT,
        field: 'category'
    },
    balance: {
        type: DataTypes.DECIMAL,
        field: 'balance'
    }
});

module.exports = viewCategories;