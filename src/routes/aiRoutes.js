const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { validateAnalyze } = require('../validators/aiValidator');

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: Nosozlik tahlili (Mock AI) API
 */

/**
 * @swagger
 * /api/ai/analyze:
 *   post:
 *     summary: Nosozlikni AI orqali tahlil qilish
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_type:
 *                 type: string
 *               device_model:
 *                 type: string
 *               problem_description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tahlil natijasi
 */
router.post('/analyze', validateAnalyze, aiController.analyze);

module.exports = router;
