/** @format */

const { Router } = require("express");

const mainRouter = Router();
const { AuthRouter } = require("./module/auth/auth.routes");
const { userRouter } = require("./module/user/user.routes");

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", userRouter);

module.exports = mainRouter;
