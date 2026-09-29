const { Repair, RepairPart, SparePart, sequelize } = require('../models');

class RepairService {
    async create(data) {
        return await Repair.create(data);
    }

    async findAll() {
        return await Repair.findAll({
            include: [{ model: RepairPart, as: 'parts', include: ['sparePart'] }]
        });
    }

    async findById(id) {
        return await Repair.findByPk(id, {
            include: [{ model: RepairPart, as: 'parts', include: ['sparePart'] }]
        });
    }

    async update(id, data) {
        const repair = await Repair.findByPk(id);
        if (!repair) return null;
        return await repair.update(data);
    }

    async delete(id) {
        const repair = await Repair.findByPk(id);
        if (!repair) return false;
        await repair.destroy();
        return true;
    }

    /**
     * Ehtiyot qismlar hisobi algoritmi
     * Transaction orqali ta'mirlashga qism qo'shish
     */
    async addPartToRepair(repairId, partData) {
        const t = await sequelize.transaction();

        try {
            const { spare_part_id, quantity } = partData;

            // 1. Repair va SparePart ni bazadan topamiz
            const repair = await Repair.findByPk(repairId, { transaction: t });
            if (!repair) {
                throw new Error("Ta'mirlash jarayoni topilmadi");
            }

            const sparePart = await SparePart.findByPk(spare_part_id, { transaction: t });
            if (!sparePart) {
                throw new Error("Ehtiyot qism topilmadi");
            }

            // 2-3. Ombordagi quantity bilan solishtirish
            // 4. Agar stock < required quantity bo'lsa xatolik qaytarish
            if (sparePart.quantity < quantity) {
                const error = new Error("Ehtiyot qism omborda yetarli emas");
                error.status = 400;
                throw error;
            }

            // 5. Yetarli bo'lsa: stock quantity kamaytiramiz
            sparePart.quantity -= quantity;
            await sparePart.save({ transaction: t });

            // 6-7. Unit price olinadi va total_price hisoblanadi
            const unit_price = sparePart.price;
            const total_price = quantity * unit_price;

            // 8. RepairPart yozuvi yaratiladi
            const repairPart = await RepairPart.create({
                repair_id: repair.id,
                spare_part_id: sparePart.id,
                quantity,
                unit_price,
                total_price
            }, { transaction: t });

            // 9. Repair.total_parts_cost yangilash
            const currentTotal = Number(repair.total_parts_cost) || 0;
            repair.total_parts_cost = currentTotal + total_price;
            await repair.save({ transaction: t });

            // Hammasi muvaffaqiyatli bo'lsa: COMMIT
            await t.commit();
            return repairPart;
        } catch (error) {
            // Agar biror operatsiya xato bo'lsa: ROLLBACK
            await t.rollback();
            throw error;
        }
    }

    async getRepairParts(repairId) {
        return await RepairPart.findAll({
            where: { repair_id: repairId },
            include: ['sparePart']
        });
    }
}

module.exports = new RepairService();
