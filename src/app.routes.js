/** @format */

const { Router } = require("express");

const mainRouter = Router();
const { AuthRouter } = require("./module/auth/auth.routes");
const { userRouter } = require("./module/user/user.routes");
const { categoryRouter } = require("./module/category/category.routes");
const { optionRouter } = require("./module/option/option.routes");

mainRouter.use("/auth", AuthRouter);
mainRouter.use("/user", userRouter);
mainRouter.use('/category' , categoryRouter)
mainRouter.use('/option' , optionRouter)

module.exports = mainRouter;
