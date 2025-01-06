const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    stock:{type:String,required:true,unique:true},
    shares:{type:Number,required:true}
})

module.exports = stockSchema;