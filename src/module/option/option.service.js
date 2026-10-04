/** @format */

const autoBind = require("auto-bind");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const slugify = require("slugify");
const OptionModel = require("./option.model");
const optionMessages = require("./option.messages");
const categoryService = require("../category/category.service");
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
    if (!optionDto.category) {
      throw new createHttpError.BadRequest(optionMessages.CategoryRequired);
    }
    if (!isValidObjectId(optionDto.category)) {
      throw new createHttpError.BadRequest(optionMessages.InvalidCategory);
    }

    const category = await this.#categoryService.checkExistById(optionDto.category);
    optionDto.category = category._id;

    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    });

    await this.checkExistByCategoryAndKey(optionDto.key, optionDto.category);
    if (optionDto?.enum && typeof optionDto.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
    } else if (!Array.isArray(optionDto.enum)) {
      optionDto.enum = [];
    }

    if (isTrue(optionDto.required)) {
      optionDto.required = true;
    }

    if (isFalse(optionDto.required)) {
      optionDto.required = false;
    }

    return this.#model.create(optionDto);
  }

  async remove(id) {
     
  }
  

  async find() {

    const options = await this.#model.find({} , {__v:0} , { sort : {_id : -1}})
    .populate([{path : 'category', select : { name:1 , slug : 1}}])
    return options
  }


  async findById(id){
     return await this.checkExistById(id)
  }
  async findByCategoryId(categoryId) {
    if (!isValidObjectId(categoryId)) {
      throw new createHttpError.BadRequest(optionMessages.InvalidCategory);
    }
    await this.#categoryService.checkExistById(categoryId);
    return this.#model
      .find({ category: categoryId }, { __v: 0 })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
  }
  
  async findByCategorySlug(slug){

    console.log('slug' , slug)
    //? option.category == category._id
    const options = await this.#model.aggregate([
       {
        $lookup:{
          from : 'categories',
          localField : 'category',
          foreignField : '_id' , 
          as : 'category'
        }
       },{
          $unwind : "$category"
        },            
        {
                $addFields: {
                    categorySlug: "$category.slug",
                    categoryName: "$category.name",
                    categoryIcon: "$category.icon",
                }
            },{
              $project : {
                category : 0 , 
                __v: 0
              }
            }, 
            {$match : {categorySlug  : slug}}

    ])


    console.log('findByCategorySlug' ,options)

    return options
    // console.dir(options[0], { depth: null });
  }


 
  async alreadyExistBySlug(slug) {

    return null;
  }

 async checkExistById(id) {
    const option = await this.#model.findById(id);
    if (!option)
      throw new createHttpError.NotFound(optionMessages.NotFound);
    return option;
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
