import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Simple Express API with Swagger",
            version: "1.0.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            // license: {
            //     name: "MIT",
            //     url: "https://spdx.org/licenses/MIT.html",
            // },
        },
        servers: [
            {
                url: "http://localhost:3311",
            },
        ],
    },
    apis: ["./routers/*.js"],
};
  
export default swaggerJsdoc(options);
