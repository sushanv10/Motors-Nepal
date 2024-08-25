// models/Bike.js

const mongoose = require('mongoose');
const {Schema}= mongoose;

const bikeSchema = new Schema({

  
 name: {
    type: String,
    required: true,
  },
  bikeType: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  registrationYear: {
    type: Number,
    required: true,
  },

  bikeCylinder: {
    type: Number,
    required: true,
  },
  bikeSpeed: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  

  bikeImage:{
      type:String,
      required: true,
      
    },
  // Add more fields as necessary
});

const Bike=mongoose.model('bike',bikeSchema);
module.exports=Bike;

//module.exports = mongoose.model('Bike', bikeSchema);
