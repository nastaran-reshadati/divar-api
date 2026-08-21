/** @format */

const autoBind = require("auto-bind");
const authService = require("./auth.service");
const AuthMeessage = require("./auth.messages");
const NodeEnv = require("../../common/utils/constants/env.enum");
class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }
  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.json({
        message: AuthMeessage.SendOtpSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const token = await this.#service.checkOTP(mobile, code);
      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === NodeEnv.Production,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: AuthMeessage.LoginSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }

  async logOut(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
