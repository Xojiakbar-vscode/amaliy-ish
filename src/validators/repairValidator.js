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

const createRepairSchema = Joi.object({
    customer_name: Joi.string().required(),
    phone: Joi.string().optional(),
    device_type: Joi.string().required(),
    device_model: Joi.string().required(),
    problem_description: Joi.string().required(),
    status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED').optional()
});

const addPartSchema = Joi.object({
    spare_part_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required()
});

module.exports = {
    validateCreate: validateRequest(createRepairSchema),
    validateAddPart: validateRequest(addPartSchema)
};
