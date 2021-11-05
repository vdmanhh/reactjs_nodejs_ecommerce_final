const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
const orderSchema = new mongoose.Schema({
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
    orderStatus: {
      type: String,
      default: "Đang xử lý",
      enum: [
        "Đang xử lý",
        "Đang giao cho Đơn vị vận chuyển",
        "Đang vận chuyển",
        "Đã giao hàng",
        "Đơn hàng bị hủy",
      ],
    },
    cartTotal : { type : Number},
    totalAfterDiscount : { type : Number},
    orderBy : {
        type : ObjectId,
        ref : "User"

    }
},

{timestamps : true}
)
module.exports = mongoose.model('Order',orderSchema)