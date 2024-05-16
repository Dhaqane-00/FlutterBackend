const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Backend Starter API",
      version: "1.0.0",
      description: "Backend Starter API Documentation",
      contact: {
        name: "Dhaqane",
      },
    },
    servers: [
      {
        url: "http://localhost:500/api",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/Routers/*.js", "./src/Model/models.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use(
    "/swagger",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
};
