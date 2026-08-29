/** @format */

const { Router } = require("express");

const mainRouter = Router();
const { AuthRouter } = require("./module/auth/auth.routes");
const { userRouter } = require("./module/user/user.routes");
const { categoryRouter } = require("./module/category/category.routes");

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", userRouter);
mainRouter.use('/category' , categoryRouter)

module.exports = mainRouter;
