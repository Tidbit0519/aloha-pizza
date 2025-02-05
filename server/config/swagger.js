import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Aloha Pizza API',
            version: '1.0.0',
        },
        components: {
            schemas: {
                Topping: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'The auto-generated id of the Topping',
                        },
                        name: {
                            type: 'string',
                            description: 'The name of the topping',
                        },
                    },
                    example: {
                        _id: '63f7bd0820bc1f431a4b91b2',
                        name: 'pepperoni',
                    },
                },
                ToppingInput: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Name of the topping',
                        },
                    },
                    example: {
                        name: 'pepperoni',
                    },
                },
            }
        },
    },
    apis: [`./routes/*.js`],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
export default swaggerDocs;