const mongoose = require('mongoose')
const wishSchema = new mongoose.Schema({
    name_user : {type : String},
    images : {
        type :Array
    },
    name_product : {type : String},
    slug : {type : String},
    description : {type : String}
},
{
    timestamps:true
})
module.exports = mongoose.model("Wishlish",wishSchema)