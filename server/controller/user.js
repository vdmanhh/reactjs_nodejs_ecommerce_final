const User = require("../model/user")
const Cart = require('../model/cart')
exports.createUser = async (req,res)=>{
   
    const {email,picture}= req.user;
    const user = await User.findOneAndUpdate(
        {email},
        {name : email.split("@")[0],picture},
        {new : true}
    )
    if(user){
        res.json(user)
        // console.log("user is exist:",user);
    }
    else {
        const newUser =await new User(
          {  email,name:email.split("@")[0],picture}
        ).save();
        res.json(newUser)
        // console.log("register user success");
    }
}
exports.currentUser = async(req,res)=>{
   
    const {email} = req.user;
    const user = await User.findOne({email})
   
    res.json({user})
}
exports.forgetPass=async(req,res)=>{

    const {email} = req.body
    const user = await User.findOne({email})
    if(user){
        res.json({
            kq : "oke"
        })
    }
    else{
        res.json({
            kq : "lose"
        })
    }
}
exports.saveAddressUser = async(req,res)=>{
    const {email,address} = req.body.user
    const user = await User.findOneAndUpdate(
        {email},
        {address : address},
        {new : true}
    ).exec()
    const user1 = await User.findOne({email}).exec()
    const cart = await Cart.findOneAndUpdate(
        {orderBy: user1._id},
        {address :address },
        {new : true}
        ).exec()
        console.log('cart : ', cart);

    try {
            res.json({
                kq : 'oke'
            })
    } catch (error) {
        console.log('ko luu duoc dia chi');
    }
}

