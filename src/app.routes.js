/** @format */

const { Router } = require("express");

const mainRouter = Router();
const { AuthRouter } = require("./module/auth/auth.routes");

mainRouter.use("/auth", AuthRouter);

module.exports = mainRouter;
