import swaggerUi from "swagger-ui-express";
import swaggereJsdoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        info: {
            title: "Test API",
            version: "1.0.0",
            description: "Test API with express",
        },
        servers: {
            description: "elice wiki",
            url: "http://localhost:5001",
        },
    },
    apis: ["./src/routes/*.js", "./src/db/models/*.js"],
};
const specs = swaggereJsdoc(options);
export { swaggerUi, specs };
