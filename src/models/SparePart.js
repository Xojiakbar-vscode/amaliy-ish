const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SparePart = sequelize.define('SparePart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    part_number: {
        type: DataTypes.STRING,
        unique: true
    },
    category: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            min: 0
        }
    },
    minimum_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
}, {
    tableName: 'spare_parts',
    timestamps: true
});

module.exports = SparePart;
