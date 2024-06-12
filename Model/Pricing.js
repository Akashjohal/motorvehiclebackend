const mongoose = require('mongoose')

const PricingSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
})

const PricingModel = mongoose.model("Pricing" , PricingSchema)
module.exports = PricingModel
// module.export= PricingModel