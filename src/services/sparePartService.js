const { SparePart } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

class SparePartService {
    async create(data) {
        return await SparePart.create(data);
    }

    async findAll() {
        return await SparePart.findAll();
    }

    async findById(id) {
        return await SparePart.findByPk(id);
    }

    async update(id, data) {
        const part = await this.findById(id);
        if (!part) return null;
        
        return await part.update(data);
    }

    async delete(id) {
        const part = await this.findById(id);
        if (!part) return false;
        
        await part.destroy();
        return true;
    }

    async getLowStock() {
        // quantity <= minimum_stock
        return await SparePart.findAll({
            where: {
                quantity: {
                    [Op.lte]: sequelize.col('minimum_stock')
                }
            }
        });
    }
}

module.exports = new SparePartService();
