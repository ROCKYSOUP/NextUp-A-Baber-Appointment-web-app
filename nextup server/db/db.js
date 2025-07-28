const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/nextcut", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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