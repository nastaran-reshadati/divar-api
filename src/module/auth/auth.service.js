/** @format */

const autoBind = require("auto-bind");
const AuthMeessage = require("./auth.messages");
const userModel = require("../user/user.model");
const createHttpError = require("http-errors");
const { randomInt } = require("crypto");
class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }
  async sendOTP(mobile) {
    const user = await this.#model.findOne({ mobile });

    const now = new Date().getTime();
    const code = randomInt(10000, 99999);
    const expiresAt = now + 1000 * 60 * 2;

    const otp = {
      code,
      expiresAt,
    };
    
    if (!user) {
      const newUser = await this.#model.create({
        mobile,
        otp,
      });
      return newUser;
      //create new user
    }
    if (user.otp && user.otp.expiresAt > now) {
      throw new createHttpError.BadRequest(AuthMeessage.OtpCodeNotExpired);
    }

    user.otp = otp;
    await user.save();
    return user;
  }

  async checkOTP(mobile, code) {
   const user = await this.checkExistByMobile(mobile)
   const now = Date.now();

   if(!user.otp || !user.otp.code){
    throw new createHttpError.Unauthorized(AuthMeessage.OtpCodeIsRequired)
   }
   if (user.otp.expiresAt < now) {
     throw new createHttpError.Unauthorized(AuthMeessage.OtpCodeExpired);
   }

   if( String(user.otp.code) !== String(code)){
    throw new createHttpError.Unauthorized(AuthMeessage.OtpCodeIsIncorrect)
   }


  if(!user.verifiedMobile){
    user.verifiedMobile =  true

    user.otp.code = undefined;
    user.otp.expiresAt = 0;

    await user.save()
  }

  return user
  }

  async logOut(userId) {}

  async checkExistByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) throw new createHttpError.NotFound(AuthMeessage.Notfound);
    return user;
  }
}

module.exports = new AuthService();
