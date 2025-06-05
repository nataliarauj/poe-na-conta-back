const DataTypes = require('sequelize')
const sequelize = require('../config/database')

const viewCountCategory = sequelize.define('viewCountCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'id'
    },
    categories: {
        type: DataTypes.INTEGER,
        field: 'categories'
    },
    premium: {
        type: DataTypes.BOOLEAN,
        field: 'premium'
    }
});

module.exports = viewCountCategory;