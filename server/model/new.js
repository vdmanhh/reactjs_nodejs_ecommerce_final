const mongoose = require('mongoose')
const newSchema = new mongoose.Schema({
    title : {
        type : String
    },
    contend : {
        type : String,
       
    },
    slug : {
        type : String,
       
    },
    image :{
        type : Array
    }
},
{timestamps : true}
)
module.exports = mongoose.model("New",newSchema)