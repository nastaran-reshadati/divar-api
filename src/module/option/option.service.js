/** @format */

const autoBind = require("auto-bind");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const categoryMessages = require("./option.messages");
const slugify = require("slugify");
const OptionModel = require("./option.model");
class OptionService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
  }
  async create(optionDto) {
    return this.#model.create(optionDto);
    
  }

  async remove(id) {
     
  }
  

  async find() {
  }


  async checkExistById(id) {
 
  }
  async alreadyExistBySlug(slug) {

    return null;
  }
}

module.exports = new OptionService();
