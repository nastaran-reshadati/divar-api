/** @format */
const dotenv = require("dotenv");
const express = require("express");

const connectDB = require("./src/config/mongoose.config");
const swaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const cookieParser = require("cookie-parser");

dotenv.config();

async function main() {
  const app = express();
  const port = process.env.PORT;

  await connectDB();
  app.use(express.json());
  app.use(express.urlencoded({extended : true}))
  app.use(cookieParser(process.env.COOKIE_SECRET))
  swaggerConfig(app);
  app.use(mainRouter)

  app.listen(port, () => {
    console.log(`server run on port ${port}`);
  });
}

main();
