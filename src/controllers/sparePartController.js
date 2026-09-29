const sparePartService = require('../services/sparePartService');

class SparePartController {
    async create(req, res, next) {
        try {
            const part = await sparePartService.create(req.body);
            res.status(201).json({ success: true, data: part });
        } catch (error) {
            next(error);
        }
    }

    async findAll(req, res, next) {
        try {
            const parts = await sparePartService.findAll();
            res.status(200).json({ success: true, data: parts });
        } catch (error) {
            next(error);
        }
    }

    async findById(req, res, next) {
        try {
            const part = await sparePartService.findById(req.params.id);
            if (!part) {
                return res.status(404).json({ success: false, message: 'Spare part not found' });
            }
            res.status(200).json({ success: true, data: part });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const part = await sparePartService.update(req.params.id, req.body);
            if (!part) {
                return res.status(404).json({ success: false, message: 'Spare part not found' });
            }
            res.status(200).json({ success: true, data: part });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const deleted = await sparePartService.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Spare part not found' });
            }
            res.status(200).json({ success: true, message: 'Spare part deleted' });
        } catch (error) {
            next(error);
        }
    }

    async getLowStock(req, res, next) {
        try {
            const parts = await sparePartService.getLowStock();
            res.status(200).json({ success: true, data: parts });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SparePartController();
