/** @format */

const autoBind = require("auto-bind");
const OptionService = require("./Option.service");
const optionMessages = require("./option.messages");
const HttpCodes = require("http-codes")

class OptionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = OptionService;
  }

  async create(req, res, next) {
    try {
      const { title, key, type, enum: enumValues, guid, required, category } = req.body; 

      await this.#service.create({
        title,
        key,
        type,
        enum: enumValues,
        guid,
        required,
        category
      });

      return res.status(HttpCodes.CREATED).json({ message: optionMessages.Created });

    } catch (error) {
      next(error);
    }
  }


    async update(req, res, next) {
    try {
      const { title, key, type, enum: enumValues, guid, required, category } = req.body; 
      const {id} = req.params
      await this.#service.create({
        id , title,
        key,
        type,
        enum: enumValues,
        guid,
        required,
        category
      });

      return res.status(HttpCodes.CREATED).json({ message: optionMessages.Updated });

    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
     
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const {id} = req.params

      const option = await this.#service.findById(id)

      return res.status(HttpCodes.OK).json({
        option
      })
     
    } catch (error) {
      next(error);
    }
  }
  async removeById(req, res, next) {
    try {
      const {id} = req.params

      const option = await this.#service.findById(id)

      return res.status(HttpCodes.OK).json({
        option
      })
     
    } catch (error) {
      next(error);
    }
  }
  async removeById(req, res, next) {
    try {
      const {id} = req.params
       await this.#service.removeById(id)
      return res.status(HttpCodes.OK).json({
        message : optionMessages.Deleted
      })
     
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
       const {categoryId} = req.params
       const option = await this.#service.findByCategoryId(categoryId)
      return res.status(HttpCodes.OK).json({
        option
      })
     
    } catch (error) {
      next(error);
    }
  }
  async findByCategorySlug(req, res, next) {

    try {
       const {slug} = req.params
       console.log(req.params)
       const options = await this.#service.findByCategorySlug(slug)
      return res.status(HttpCodes.OK).json({
        options
      })
     
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try{
     const options= await this.#service.find()

     return res.status(HttpCodes.OK).json({
      options
     })
    }catch(err){
     next(err)
    }
  }
}

module.exports = new OptionController();
