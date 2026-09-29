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

const createSchema = Joi.object({
    name: Joi.string().required(),
    part_number: Joi.string().optional(),
    category: Joi.string().optional(),
    quantity: Joi.number().integer().min(0).default(0),
    price: Joi.number().min(0).required(),
    minimum_stock: Joi.number().integer().min(0).default(0)
});

const updateSchema = Joi.object({
    name: Joi.string().optional(),
    part_number: Joi.string().optional(),
    category: Joi.string().optional(),
    quantity: Joi.number().integer().min(0).optional(),
    price: Joi.number().min(0).optional(),
    minimum_stock: Joi.number().integer().min(0).optional()
});

module.exports = {
    validateCreate: validateRequest(createSchema),
    validateUpdate: validateRequest(updateSchema)
};
