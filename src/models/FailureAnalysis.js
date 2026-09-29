const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FailureAnalysis = sequelize.define('FailureAnalysis', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    repair_id: {
        type: DataTypes.INTEGER,
        allowNull: true // Analiz qilinganda repair yaratilmagan bo'lishi ham mumkin yoki bog'lanishi mumkin
    },
    problem_category: {
        type: DataTypes.STRING
    },
    possible_cause: {
        type: DataTypes.TEXT
    },
    recommendation: {
        type: DataTypes.TEXT
    },
    risk_level: {
        type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH')
    },
    required_parts: {
        type: DataTypes.JSONB // PostgreSQL dagi JSONB
    }
}, {
    tableName: 'failure_analyses',
    timestamps: true
});

module.exports = FailureAnalysis;
