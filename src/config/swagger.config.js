/** @format */

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function swaggerConfig(app) {
  const swaggerDoc = swaggerJsdoc({
    definition: {
      openapi: "3.0.0",

      info: {
        title: "Divar API",
        description: "API documentation for Divar project",
        version: "1.0.0",
      },
    },

    apis: [process.cwd() +"/src/module/**/*.swagger.js"],
  });

  const swagger = swaggerUi.setup(swaggerDoc, {});
  app.use("/swagger", swaggerUi.serve, swagger);
}

module.exports = swaggerConfig;
