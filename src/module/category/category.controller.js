/** @format */

const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const categoryMessages = require("./category.messages");
const { default: httpCodes } = require("http-codes");

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }

  async create(req, res, next) {
    try {
      const { name, slug, icon, parent } = req.body;
      await this.#service.create({ name, slug, icon, parent });
      return res.status(httpCodes.CREATED).json({
        message: categoryMessages.Created,
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const categories = await this.#service.find();
      return res.json(categories);
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    const { id } = req.params;
    await this.#service.remove(id);
    return res.json({
      message: categoryMessages.Deleted,
    });
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
