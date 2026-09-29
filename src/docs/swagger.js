const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Technical Repair System API',
            version: '1.0.0',
            description: 'Texnika ta\'miri va ehtiyot qismlar hisobi loyihasi API hujjatlari. (Talaba: Qodirjonov Xojiakbar, Variant: №15)',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Swagger kommentariylarini topish uchun
};

const specs = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;
