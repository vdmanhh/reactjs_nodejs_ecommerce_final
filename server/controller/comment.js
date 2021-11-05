const Comment = require('../model/comment')

exports.saveComment = async(req,res)=>{
    console.log(req.body.user);
    const {writer} = req.body.user
    const {postIdProduct} = req.body.user
    const {content} = req.body.user
    const {responseTo} = req.body.user
    const {name} = req.body.user
    const {time} = req.body.user
    if(!responseTo){
        const comment = await new Comment({writer,postIdProduct,content,name,time}).save();
        const resComment = await Comment.findOne({_id :comment._id })
        .populate("user")
        .exec();
        try {
            res.json(resComment)
        } catch (error) {
                console.log("ko tim duoc comment 1");
        }
    }
    else {


        const comment = await new Comment({responseTo,writer,postIdProduct,content,name,time}).save();
        const resComment = await Comment.findOne({_id :comment._id }).exec();
        try {
            res.json(resComment)
        } catch (error) {
                console.log("ko tim duoc comment 2");
        }
    

}
}

exports.getComments = async(req,res)=>{
    const postIdProduct = req.body.postIdProduct

    const getCommentt = await Comment.find({postIdProduct})
    .populate("writer")
    .exec();
    res.json(getCommentt)
}