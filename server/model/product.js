const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema;
const productSchema =  new mongoose.Schema({
    name : {
        type : String,
        maxlength : 90,
        trim: true,
        require : true,
        text: true,
    },
     price : {
         type : Number,
         require : true,
         maxlength : 90
     },
     slug : {
        type : String,
        index  :true,
        lowercase : true,
        unique : true
     },
     description : {
        type : String,
        maxlength : 700,
        text: true,
     },
     discount : {
      type : String,
      maxlength : 20
   },
   shipping : {
      type : String,
     
      require : true
  },
   states : {
      type : String,
  
      require : true
  },
     address : {
        type : String,
        require : true,
        maxlength : 200
     },

     category : {
        type : ObjectId,
        ref : "Category"
     },
     sub : {
        type : ObjectId,
        ref : "Sub"
     },

     images : {
         type : Array
     },
     ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
},
    {timestamps : true}
)
module.exports = mongoose.model("Product" ,productSchema )