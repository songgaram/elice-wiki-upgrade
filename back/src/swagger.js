import swaggerUi from "swagger-ui-express";
import swaggereJsdoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Test API",
            version: "1.0.0",
            description: "Test API with express",
        },
        basePath: "/",
        // servers: {
        //     description: "elice wiki",
        //     url: "http://localhost:5001/swagger",
        // },
    },
    apis: ["./src/routes/*.js", "./src/db/models/*.js"],
};
const specs = swaggereJsdoc(options);
export { swaggerUi, specs };
