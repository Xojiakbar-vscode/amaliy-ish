const repairService = require('../services/repairService');

class RepairController {
    async create(req, res, next) {
        try {
            const repair = await repairService.create(req.body);
            res.status(201).json({ success: true, data: repair });
        } catch (error) {
            next(error);
        }
    }

    async findAll(req, res, next) {
        try {
            const repairs = await repairService.findAll();
            res.status(200).json({ success: true, data: repairs });
        } catch (error) {
            next(error);
        }
    }

    async findById(req, res, next) {
        try {
            const repair = await repairService.findById(req.params.id);
            if (!repair) {
                return res.status(404).json({ success: false, message: 'Repair not found' });
            }
            res.status(200).json({ success: true, data: repair });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const repair = await repairService.update(req.params.id, req.body);
            if (!repair) {
                return res.status(404).json({ success: false, message: 'Repair not found' });
            }
            res.status(200).json({ success: true, data: repair });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const deleted = await repairService.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Repair not found' });
            }
            res.status(200).json({ success: true, message: 'Repair deleted' });
        } catch (error) {
            next(error);
        }
    }

    async addPart(req, res, next) {
        try {
            const repairId = req.params.repairId;
            const partData = req.body;
            
            const repairPart = await repairService.addPartToRepair(repairId, partData);
            res.status(201).json({ success: true, data: repairPart });
        } catch (error) {
            // Agar status 400 qo'yilgan bo'lsa (yetarli qism yo'q), o'shani qaytaramiz
            if (error.status === 400) {
                return res.status(400).json({ success: false, message: error.message });
            }
            next(error);
        }
    }

    async getParts(req, res, next) {
        try {
            const repairId = req.params.repairId;
            const parts = await repairService.getRepairParts(repairId);
            res.status(200).json({ success: true, data: parts });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new RepairController();
