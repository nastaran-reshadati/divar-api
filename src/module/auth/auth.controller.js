/** @format */

const autoBind = require("auto-bind");
const authService = require("./auth.service");
const AuthMeessage = require("./auth.messages");
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
      return {
        message: AuthMeessage.SendOtpSuccessfully,
      };
      this.#service.checkOTP();
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
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
