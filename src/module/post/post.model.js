const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema({
    title : {type : String , required : true},
    userId : { type : Types.ObjectId , required : true , ref : 'User'} ,
    amount : { type : Number , required : true , default : 0} , 
    content : {type : String , required : true} , 
    category : {type : Types.ObjectId , ref : 'Category' , required : true}, 
    province : { type : String  ,required : true} ,
    city : { type : string , required : false},
    dictrict : {type : Number},
    address : {type : string} ,
    coordinate : { type : [Number] },
    options : { type : Object , default : {}}
} , {
    timestamps : true
})

const PostModel =  model('post' , PostSchema)
module.exports =  PostModel