const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
const cartSchema = new mongoose.Schema({
    products : [
      {
        product : {
            type : ObjectId,
            ref : "Product"
        },
        price : { type : Number},
        count : { type : Number}
      }

    ],
    address : {type : String},
    discount : { type : Number},
    cartTotal : { type : Number},
    totalAfterDiscount : { type : Number},
    orderBy : {
        type : ObjectId,
        ref : "User"

    }
},

{timestamps : true}
)
module.exports = mongoose.model('Cart',cartSchema)