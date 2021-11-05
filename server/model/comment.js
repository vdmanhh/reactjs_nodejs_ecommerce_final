const mongoose = require('mongoose')

const {ObjectId} = mongoose.Schema;
const commentSchema = new mongoose.Schema({
    
    content : {type : String},
    name : {type : String},
    time : {type : String},
    writer : {
        type : ObjectId,
        ref : 'User'
    },
    postIdProduct : {
        type : ObjectId,
        ref : "Product"
    },
    responseTo : {
        type : ObjectId,
        ref : 'User'
    }
},
{timestamps : true}
)

module.exports = mongoose.model("Comment",commentSchema)