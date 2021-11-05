const Order = require('../model/order')
const User = require('../model/user')
exports.getAllOrder = async(req,res)=>{
    const {email} = req.body.user;
    const user = await User.findOne({email}).exec();
    const order =await Order.find({orderBy : user._id})
    .populate('products.product')
    .populate('orderBy')
    .exec();
  
    res.json(order)

}
exports.filterOrder =async (req,res)=>{
  
    const {arg} = req.body.user;
    const order = await Order.find({orderStatus :arg })
    .populate('products.product')
    .populate('orderBy')
    .exec()
  
    if(order){
        res.json(order)
    }
    else {
        res.json({kq :'false'})
    }
}
exports.UpdateOrder=async (req,res)=>{
    
    const {_id ,orderStatus} = req.body.user;
    const order = await Order.findByIdAndUpdate(
        {_id},
        {orderStatus},
        {new : true}
    ).exec();
    res.json({
        kq : 'oke'
    })
}