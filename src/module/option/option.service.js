/** @format */

const autoBind = require("auto-bind");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const categoryMessages = require("./option.messages");
const slugify = require("slugify");
const OptionModel = require("./option.model");
const optionMessages = require("./option.messages");
const categoryService = require('../category/category.service')
const { isTrue, isFalse } = require("../../common/utils/functions");
class OptionService {
  #model;
  #categoryService;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryService= categoryService
  }
  async create(optionDto) {
    const category = await this.#categoryService.checkExistById(optionDto.category)
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

    console.log(option)
   return option
    //console.log('optionDTO' , optionDto)
    // return this.#model.create(optionDto);
    
  }

  async remove(id) {
     
  }
  

  async find() {

    const options = await this.#model.find({} , {__v:0} , { sort : {_id : -1}})
    .populate([{path : 'category', select : { name:1 , slug : 1}}])
    return options
  }


 
  async alreadyExistBySlug(slug) {

    return null;
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
