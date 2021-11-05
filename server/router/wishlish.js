const express = require('express')
const router = express.Router();
const {adminCheck,authCheck} = require('../mildware/auth')
const {createWish,getWishlish,deleteWish} = require('../controller/wishlish')

router.post('/create-wish',authCheck,createWish)
router.post('/get-wish',authCheck,getWishlish)
router.post('/delete-wish',authCheck,deleteWish)
module.exports = router