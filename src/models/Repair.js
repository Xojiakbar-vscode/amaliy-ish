const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Repair = sequelize.define('Repair', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING
    },
    device_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    device_model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    problem_description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'),
        defaultValue: 'PENDING'
    },
    total_parts_cost: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0
    }
}, {
    tableName: 'repairs',
    timestamps: true
});

module.exports = Repair;
