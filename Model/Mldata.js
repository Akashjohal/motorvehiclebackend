const mongoose = require('mongoose')

const MldtSchema = new mongoose.Schema({
      Sno:Number,
      Make:String,
      Model:String,
      Variant:String,
      Category_of_Services:String,
      Sub_Category:String,
      Package_Name:String,
      MRP:Number,
      Pricing:Number,
      city:String,


})


const MldtModel = mongoose.model("mldata" , MldtSchema)
module.exports = MldtModel