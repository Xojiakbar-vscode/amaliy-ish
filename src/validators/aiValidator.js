const Joi = require('joi');

const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            return res.status(400).json({ success: false, message: errorMessage });
        }
        next();
    };
};

const analyzeSchema = Joi.object({
    device_type: Joi.string().required(),
    device_model: Joi.string().optional(),
    problem_description: Joi.string().required()
});

module.exports = {
    validateAnalyze: validateRequest(analyzeSchema)
};
