/** @format */

const { default: mongoose } = require("mongoose");

async function connectDB() {
  try {
    const uri = process.env.MONGODB_URL;
    if (!uri) {
      throw new Error("MONGODB_URL is not defined in .env");
    }

    await mongoose.connect(uri);
    console.log("Connected to DB Successfully");
  } catch (err) {
    console.log(err?.message ?? "Failed DB Connection");
    process.exit(1);
  }
}

module.exports = connectDB;
