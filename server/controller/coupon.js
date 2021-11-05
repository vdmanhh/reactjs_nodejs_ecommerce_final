const Coupon = require('../model/coupon')

exports.createCoupon=async(req,res)=>{
  
    const {name,expiry,discount} = req.body.user;
    const coupon = await new Coupon({name,expiry,discount}).save()
    try {
        res.json({
            kq :'oke'
        })
    } catch (error) {
        console.log('ko tao dc coupon');
    }
}
exports.getAllcoupon = async(req,res)=>{
    const coupon = await Coupon.find({}).exec();
    res.json(coupon)
}
exports.deletecoupon=async (req,res)=>{
    const {_id}= req.body.user;
  
    const coupon =await Coupon.findByIdAndDelete({_id}).exec();
    try {
        res.json({kq :'oke'}) 
    } catch (error) {
        console.log('ko xoa dc coupon');
    }
}

exports.findcoupon=async (req,res)=>{
    const {_id}= req.body.user;

    const coupon =await Coupon.findOne({_id}).exec();
    console.log('h:',coupon);
    try {
        res.json(coupon) 
    } catch (error) {
        console.log('ko xoa dc coupon');
    }
}

exports.updateCoupon=async (req,res)=>{
    const {name,expiry,discount,_id} = req.body.user;
    const coupon = await Coupon.findByIdAndUpdate(
        {_id},
        {name,expiry,discount},{new:true}
    ).exec()
    res.json({kq : 'oke'})
}