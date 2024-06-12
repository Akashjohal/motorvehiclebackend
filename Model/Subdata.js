
const mongoose = require('mongoose')

const SubdataSchema = new mongoose.Schema({
      Sno:Number,
      Make:String,
      Package_Name:String,
      Best:String,
      

})

const SubdataModel = mongoose.model("Subdata" , SubdataSchema)
module.exports = SubdataModel