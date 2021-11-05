const express= require('express');
const { createCoupon,getAllcoupon,deletecoupon,updateCoupon ,findcoupon} = require('../controller/coupon');
const router = express.Router();
const {adminCheck,authCheck} = require('../mildware/auth')

router.post('/create-coupon',adminCheck,authCheck,createCoupon)
router.post('/get-coupon',adminCheck,authCheck,getAllcoupon)
router.post('/delete-coupon',adminCheck,authCheck,deletecoupon)
router.post('/find-coupon',adminCheck,authCheck,findcoupon)

router.post('/update-coupon',adminCheck,authCheck,updateCoupon)
module.exports = router;