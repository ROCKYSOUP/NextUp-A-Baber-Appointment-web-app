const mongoose = require("mongoose")

const customerSchema=new mongoose.Schema({
    name:String,
    appointment:String,
    barber:String,
     createdAt: {
    type: Date,
    default: Date.now
  }
})


const Customer=mongoose.model('Customer',customerSchema)
module.exports=Customer;