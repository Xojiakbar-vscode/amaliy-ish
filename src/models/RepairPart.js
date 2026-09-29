const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RepairPart = sequelize.define('RepairPart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    repair_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    spare_part_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: 'repair_parts',
    timestamps: true
});

module.exports = RepairPart;
