/** @format */

const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const categoryMessages = require("./category.messages");

class CategoryService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = CategoryModel;
  }
  async create(categoryDto) {
    if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
      const existCategory = await this.checkExistById(categoryDto.parent);
      categoryDto.parent = existCategory._id.toString();
      categoryDto.parents = [
        ...new Set(
          [categoryDto.parent]
            .concat(existCategory.parents.map((id) => id.toString()))
            .map((id) => new Types.ObjectId(id)),
        ),
      ];

      if (categoryDto?.slug) {
        categoryDto.slug = slugify(categoryDto.slug);
        await this.alreadyExistBySlug(categoryDto.slug);
      } else {
        categoryDto.slug = slugify(categoryDto.name);
        await this.alreadyExistBySlug(categoryDto.slug);
      }
      const category = await this.#model.create(categoryDto);
      return category;
    }
  }

  async remove(id) {
    await this.checkExistById(id);
    await this.#optionModel.deleteMany({ category: id });
    await this.#model.deleteMany({ _id: id });
    return true;
  }

  async find() {
    return await this.#model.find({ parent: { $exists: false } });
    //Get Root Categories
  }

  async checkExistById(id) {
    const category = await this.#model.findById(id);
    if (!category)
      throw new createHttpError.NotFound(categoryMessages.NotFound);
    return category;
  }
  async alreadyExistBySlug(slug) {
    const category = await this.#model.findOne(slug);
    if (category)
      throw new createHttpError.Conflict(categoryMessages.alreadyExist);
    return null;
  }
}

module.exports = new CategoryService();
