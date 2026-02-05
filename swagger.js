const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My E-commerce API",
            version: "1.0.0",
            description: "Documentation for my e-commerce API",
        },
    },
    apis: ["./src/routes/*.js"], // هنا تحدد ملفاتك اللي فيها routes
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
