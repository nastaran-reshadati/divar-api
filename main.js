/** @format */
const dotenv = require("dotenv");
const express = require("express");

const connectDB = require("./src/config/mongoose.config");
const swaggerConfig = require("./src/config/swagger.config");

dotenv.config();

async function main() {
  const app = express();
  const port = process.env.PORT;

  await connectDB();
  app.use(express.json());

  swaggerConfig(app);

  app.listen(port, () => {
    console.log(`server run on port ${port}`);
  });
}

main();
