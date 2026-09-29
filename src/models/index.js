const sequelize = require('../config/database');

const SparePart = require('./SparePart');
const Repair = require('./Repair');
const RepairPart = require('./RepairPart');
const FailureAnalysis = require('./FailureAnalysis');

// Associations (Bog'lanishlar)

// Repair hasMany RepairPart
Repair.hasMany(RepairPart, {
    foreignKey: 'repair_id',
    as: 'parts'
});
RepairPart.belongsTo(Repair, {
    foreignKey: 'repair_id',
    as: 'repair'
});

// SparePart hasMany RepairPart
SparePart.hasMany(RepairPart, {
    foreignKey: 'spare_part_id'
});
RepairPart.belongsTo(SparePart, {
    foreignKey: 'spare_part_id',
    as: 'sparePart'
});

// Repair hasOne FailureAnalysis
Repair.hasOne(FailureAnalysis, {
    foreignKey: 'repair_id',
    as: 'analysis'
});
FailureAnalysis.belongsTo(Repair, {
    foreignKey: 'repair_id'
});

module.exports = {
    sequelize,
    SparePart,
    Repair,
    RepairPart,
    FailureAnalysis
};
