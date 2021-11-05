const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
const userSchema =new mongoose.Schema({
    name : {type : String},
    email :{
        type : String,
        require : true,
        index : true
    },
    role : {
        default : "Subcribler",
        type : String
    },
    cart:{
        type:Array,
        default:[],
    },

    address:{
        type :String,
    },
    wishlist: [{ type: ObjectId,ref: "Product" }],
},
    {timestamps : true}


)

module.exports = mongoose.model("User",userSchema)