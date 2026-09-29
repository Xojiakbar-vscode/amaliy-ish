const AIService = require('../services/aiService'); // class orqali static function ishlatish uchun

class AIController {
    async analyze(req, res, next) {
        try {
            // Separation of Concerns: controller faqat so'rov qabul qiladi
            const data = req.body;
            
            // Biznes logikasi service layerda ishlaydi (Async)
            const analysisResult = await AIService.analyzeFailure(data);
            
            // Natijani qaytarish
            res.status(200).json({
                success: true,
                data: analysisResult
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AIController();
