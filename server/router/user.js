const express = require('express')
const router = express.Router();
const {adminCheck,authCheck} = require('../mildware/auth')
const {createUser,currentUser,forgetPass,saveAddressUser} = require('../controller/user')
const {UserCart,getCart,applyCoupon,emptyCart,getCartUserPayment,createOrder} =require('../controller/cart')
router.post('/create-or-update',authCheck,createUser)
router.post('/current-user',authCheck,currentUser)
router.post('/forget-pass',forgetPass)
router.post('/check-admin',adminCheck,authCheck,currentUser)

router.post('/user-cart',authCheck,UserCart)
router.post('/get-cart',authCheck,getCart)

router.post('/save-address',authCheck,saveAddressUser)

router.post('/apply-coupon',authCheck,applyCoupon)
router.post('/empty-cart',authCheck,emptyCart)
router.post('/get-cart-user-payment',authCheck,getCartUserPayment)
router.post('/create-order',authCheck,createOrder)
module.exports = router