const User = require('../model/user')
const Cart = require('../model/cart')
const Product = require('../model/product')
const Coupon =require('../model/coupon')
const Order = require('../model/order')
exports.UserCart = async (req, res) => {

   try {
    let products = [];
    const { email, cart } = req.body.user
    let user = await User.findOne({ email }).exec();

    let cartExistByThisUser = await Cart.findOne({ orderBy: user._id }).exec();
    console.log('cartExistByThisUser=>', cartExistByThisUser);
    if (cartExistByThisUser) {
        cartExistByThisUser.remove();
        console.log("removed old cart");
    }

    for (let i = 0; i < cart.length; i++) {
        let object = {};
    
        object.product = cart[i]._id;
        object.count = cart[i].count;
      
        // get price for creating total
        let  productFromDb = await Product.findById(cart[i]._id).select("price").exec();
        object.price = productFromDb.price;
    
        products.push(object);
      }

      let cartTotal = 0;
      for (let i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
      }
    
      let newCart = await new Cart({
        products,
        cartTotal,
        orderBy: user._id,
      }).save();
      res.json({ ok: 'oke' });
   } catch (error) {
       console.log('ko save dc cart');
   }
      
}
exports.getCart=async (req,res)=>{
  console.log(req.body.user.email);
  const {email} = req.body.user
  const user = await User.findOne({email}).exec();
  const cart = await Cart.findOne({orderBy : user._id})
  .populate('products.product',"_id name price totalAfterDiscount")
  .exec();
  if(!cart){
    console.log('ko tim dc');
    res.json({
      kq :'false'
    })
  }
  else{
    const {products,cartTotal,totalAfterDiscount} = cart
    res.json({products,cartTotal,totalAfterDiscount})
  }
 

}

exports.applyCoupon = async (req,res)=>{
  const {coupon,email} = req.body.user
 
  const validCoupon = await Coupon.findOne({name : coupon}).exec();
    console.log('validCoupon',validCoupon);
  if(validCoupon===null){
    return res.json({
      kq : 'false'
    })
  }

  const user = await User.findOne({email}).exec();
  const cart = await Cart.findOne({orderBy : user._id})
  .populate('products.product','_id title price')
  .exec();

  let { products, cartTotal} = cart

  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  )  
  // .toFixed(2); lay xap xi
    let discount = validCoupon.discount
    console.log('discountt',discount);
  Cart.findOneAndUpdate(
    { orderBy: user._id },
    { totalAfterDiscount,discount },
   
    { new: true }
    
  ).exec();
    
  res.json({totalAfterDiscount,discount});
}
exports.emptyCart=async(req,res)=>{
  console.log(req.body.user.email);
  const {email} = req.body.user;
  const user = await User.findOne({email}).exec();
  const cart = await Cart.findOneAndRemove({orderBy : user._id}).exec();
  res.json({
    kq : 'oke'
  })
}


exports.getCartUserPayment=async(req,res)=>{
  console.log(req.body.user.email);
  const {email} = req.body.user;
  const user = await User.findOne({email}).exec();
  const cart = await Cart.findOne({orderBy : user._id})
  .populate('products.product')
  .populate('orderBy')
  .exec();
 
  if(!cart){
    res.json({
      kq :'false'
    })
  }
  else {
  
    res.json(cart)
  }
  
}


exports.createOrder=async(req,res)=>{
  console.log(req.body.user.email);
  const {email} = req.body.user;
  const user = await User.findOne({email}).exec();
  const cart = await Cart.findOne({orderBy : user._id})
  .populate('products.product')
  .populate('orderBy')
  .exec();
  
  if(cart.totalAfterDiscount){
    let {totalAfterDiscount,products,cartTotal,orderBy,discount,address} = cart;
      const order = await Order({totalAfterDiscount,products,cartTotal,orderBy,discount,address}).save();
      res.json({
        kq :'oke'
      })
  }
  else{
    let {products,cartTotal,orderBy,discount,address} = cart;
      const order = await Order({products,cartTotal,orderBy,discount,address}).save();
      res.json({
        kq :'oke'
      })
  }
}
