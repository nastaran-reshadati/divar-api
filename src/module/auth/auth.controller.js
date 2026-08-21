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
      return res.json({
        message: AuthMeessage.SendOtpSuccessfully,
      })
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {

       const { mobile  , code} = req.body;
     const result =  await this.#service.checkOTP(mobile , code);
      return res.json({
        message: AuthMeessage.LoginSuccessfully,
        data : result
      })
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
