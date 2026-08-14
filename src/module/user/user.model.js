/** @format */

const { Schema, default: mongoose } = require("mongoose");

const OTPSchema = new Schema({
  code: { type: String, require: false, default: undefined },
  expiresAt: { type: Number, required: false, default: 0 },
});
const userSchema = new Schema(
  {
    fullName: { type: String, required: false },
    mobile: { type: String, required: true, unique: true },
    otp: { type: OTPSchema, required: true },
    verifiedMobile: { type: Boolean, default: false, required: true },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
