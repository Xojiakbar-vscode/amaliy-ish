const { FailureAnalysis } = require('../models');

class AIService {
    /**
     * Nosozlikni AI orqali tahlil qilish (Mock AI Service)
     * Keyinchalik OpenAI API shuyerga ulanadi
     */
    static async analyzeFailure(data) {
        const { device_type, device_model, problem_description } = data;

        return new Promise((resolve) => {
            // Async processni imitatsiya qilish
            setTimeout(() => {
                let result = {};

                const desc = problem_description.toLowerCase();

                // Mock logic (qizib ketish)
                if (desc.includes('qizib') || desc.includes('issiq') || desc.includes('ovoz') || desc.includes('ventilyator')) {
                    result = {
                        problem_category: "Cooling System",
                        possible_cause: "Cooling fan malfunction or dust accumulation",
                        recommendation: "Cooling systemni tozalash va thermal paste almashtirish tavsiya etiladi.",
                        risk_level: "HIGH",
                        required_parts: ["Cooling Fan", "Thermal Paste"]
                    };
                } 
                // Mock logic (ekran)
                else if (desc.includes('ekran') || desc.includes('singan') || desc.includes('qora')) {
                    result = {
                        problem_category: "Display",
                        possible_cause: "Physical damage to the screen or loose display cable",
                        recommendation: "Ekranni almashtirish kerak.",
                        risk_level: "MEDIUM",
                        required_parts: ["Display Panel"]
                    };
                }
                // Mock logic (quvvat)
                else if (desc.includes('zaryad') || desc.includes('batareya') || desc.includes('quvvat')) {
                    result = {
                        problem_category: "Power/Battery",
                        possible_cause: "Battery degradation or charging port issue",
                        recommendation: "Batareyani tekshirish va kerak bo'lsa yangisiga almashtirish.",
                        risk_level: "LOW",
                        required_parts: ["Battery"]
                    };
                }
                // Boshqa barcha holatlar uchun umumiy xulosa
                else {
                    result = {
                        problem_category: "General Hardware",
                        possible_cause: "Unknown internal component failure",
                        recommendation: "To'liq diagnostika qilish tavsiya etiladi.",
                        risk_level: "MEDIUM",
                        required_parts: []
                    };
                }

                resolve(result);
            }, 1000); // 1 soniya kutish
        });
    }

    async saveAnalysis(repairId, analysisResult) {
        return await FailureAnalysis.create({
            repair_id: repairId,
            ...analysisResult
        });
    }
}

module.exports = new AIService();
