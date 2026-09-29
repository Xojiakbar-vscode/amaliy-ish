const express = require('express');
const router = express.Router();
const sparePartController = require('../controllers/sparePartController');
const { validateCreate, validateUpdate } = require('../validators/sparePartValidator');

/**
 * @swagger
 * tags:
 *   name: SpareParts
 *   description: Ehtiyot qismlarni boshqarish API
 */

/**
 * @swagger
 * /api/spare-parts/low-stock:
 *   get:
 *     summary: Kam qolgan ehtiyot qismlarni olish
 *     tags: [SpareParts]
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 */
router.get('/low-stock', sparePartController.getLowStock);

/**
 * @swagger
 * /api/spare-parts:
 *   get:
 *     summary: Barcha ehtiyot qismlarni olish
 *     tags: [SpareParts]
 *     responses:
 *       200:
 *         description: Ehtiyot qismlar ro'yxati
 *   post:
 *     summary: Yangi ehtiyot qism qo'shish
 *     tags: [SpareParts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Muvaffaqiyatli qo'shildi
 */
router.route('/')
    .get(sparePartController.findAll)
    .post(validateCreate, sparePartController.create);

/**
 * @swagger
 * /api/spare-parts/{id}:
 *   get:
 *     summary: ID bo'yicha ehtiyot qismni olish
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *   put:
 *     summary: ID bo'yicha ehtiyot qismni yangilash
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli yangilandi
 *   delete:
 *     summary: ID bo'yicha ehtiyot qismni o'chirish
 *     tags: [SpareParts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli o'chirildi
 */
router.route('/:id')
    .get(sparePartController.findById)
    .put(validateUpdate, sparePartController.update)
    .delete(sparePartController.delete);

module.exports = router;
