const mongoose = require("mongoose")

const connectdb=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/nextcut", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}


module.exports=connectdb;