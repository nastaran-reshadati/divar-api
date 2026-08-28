/** @format */

const autoBind = require("auto-bind");
const userModel = require("./user.model");

class UserService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = userModel;
  }

  async whoami(user) {
    // اطلاعات کاربر از قبل در میدل‌ور پیدا شده و اینجا تحویل داده می‌شود
    return user;
  }
}

module.exports = new UserService();
