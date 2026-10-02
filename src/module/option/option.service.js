/** @format */

const autoBind = require("auto-bind");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const categoryMessages = require("./option.messages");
const slugify = require("slugify");
const OptionModel = require("./option.model");
const optionMessages = require("./option.messages");
const { isTrue, isFalse } = require("../../common/utils/functions");
class OptionService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
  }
  async create(optionDto) {
    const category = await this.checkExistById(optionDto.category)
    optionDto.category= category._id
    console.log('category' , category)

    optionDto.key = slugify(optionDto.key , {
      trim : true ,
      replacement : "_",
      lower : true
    })

    await this.checkExistByCategoryAndKey(optionDto.key , optionDto.category)
    if(optionDto?.enum && typeof optionDto.enum === 'string'){
      optionDto.enum = optionDto.enum.split(',')
    }else if(!Array.isArray(optionDto.enum)){
      optionDto.enum = []
    }

    if(isTrue(optionDto.required)){
      optionDto.required = true
    }

    if(isFalse(optionDto.required)){
      optionDto.required = false
    }
  const option = await this.#model.create(optionDto)
   return option
    //console.log('optionDTO' , optionDto)
    // return this.#model.create(optionDto);
    
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

  async checkExistById(id){
    const category = await this.#model.findById(id)
    if(!category){
      throw new createHttpError.NotFound(optionMessages.NotFound)
    }
    return category
  }

  async checkExistByCategoryAndKey(key , category , exceptionId  = null){
     const isExist = await this.#model.findOne({
      key , category  , 
      _id : { $ne : exceptionId }
     })

     if(isExist){
      throw new createHttpError.Conflict(optionMessages.alreadyExist)
     }

     return null
  }
}

module.exports = new OptionService();
