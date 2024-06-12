const mongoose = require('mongoose')

const MoreSchema = new mongoose.Schema({
    CATEGORY: String,
    SUB_CATEGORY: String,
    Package_Name: String,
    Inclusion:String,
    Scope:String,
})

const MoreModel = mongoose.model("Moredata" , MoreSchema)
module.exports = MoreModel
