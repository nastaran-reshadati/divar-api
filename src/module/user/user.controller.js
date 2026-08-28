/** @format */

const autoBind = require("auto-bind");

class userController {
  #service;
  constructor() {
    autoBind(this);
    // this.#service = userService;
  }
  async whoami(req, res, next) {
    try {
      const user = req?.user;
      console.log('User' ,user)
      return res.status(200).json({
        user
      })
      
      return user;
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new userController();
