require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log ('Connected to DB')
}).catch((err)=> {
    console.log(err)
})

const { Product } = mongoose.models;

module.exports = {
  ...mongoose.models, 
  conn: mongoose,     
};




