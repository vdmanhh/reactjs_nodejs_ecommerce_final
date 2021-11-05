const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
        name : {
            require : true,
            type : String,
            trim : true,
        },
        slug : {
            type : String,
            unique : true ,
            trim : true,
            lowercase : true,
            index : true
        },
        // image :{
        // //     type:Array
        // // }
},
    {timestamps:true}
)

module.exports = mongoose.model("Category",categorySchema)