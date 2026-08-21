/** @format */

const { default: mongoose } = require("mongoose");

async function connectDB() {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log(err?.message ?? "Failed DB Connection");
  }
}

module.exports = connectDB;
