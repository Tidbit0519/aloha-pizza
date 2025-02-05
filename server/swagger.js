import swaggerJSDoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Aloha Pizza API",
            version: "1.0.0",
            description: "API for Aloha Pizza",
        },
    },
    apis: ["./server/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;