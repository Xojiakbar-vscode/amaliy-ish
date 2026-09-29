const express = require('express');
const router = express.Router();
const repairController = require('../controllers/repairController');
const { validateCreate, validateAddPart } = require('../validators/repairValidator');

/**
 * @swagger
 * tags:
 *   name: Repairs
 *   description: Ta'mirlash jarayonlarini boshqarish API
 */

/**
 * @swagger
 * /api/repairs:
 *   get:
 *     summary: Barcha ta'mirlashlarni olish
 *     tags: [Repairs]
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *   post:
 *     summary: Yangi ta'mirlash jarayonini yaratish
 *     tags: [Repairs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_name:
 *                 type: string
 *               device_type:
 *                 type: string
 *               device_model:
 *                 type: string
 *               problem_description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Yaratildi
 */
router.route('/')
    .get(repairController.findAll)
    .post(validateCreate, repairController.create);

router.route('/:id')
    .get(repairController.findById)
    .put(repairController.update)
    .delete(repairController.delete);

/**
 * @swagger
 * /api/repairs/{repairId}/parts:
 *   get:
 *     summary: Ta'mirlashga ishlatilgan qismlarni olish
 *     tags: [Repairs]
 *     parameters:
 *       - in: path
 *         name: repairId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *   post:
 *     summary: Ta'mirlashga ehtiyot qism qo'shish (Transaction ishlatiladi)
 *     tags: [Repairs]
 *     parameters:
 *       - in: path
 *         name: repairId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               spare_part_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Qo'shildi
 *       400:
 *         description: Omborda yetarli emas
 */
router.route('/:repairId/parts')
    .get(repairController.getParts)
    .post(validateAddPart, repairController.addPart);

module.exports = router;
