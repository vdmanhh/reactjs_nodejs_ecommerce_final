const express = require("express");
const router = express.Router();
const {adminCheck,authCheck} = require('../mildware/auth')
const {getAllOrder,filterOrder,UpdateOrder} = require('../controller/order')
router.post("/getall-order",authCheck,getAllOrder)

router.post("/filter-order",authCheck,adminCheck,filterOrder)

router.post("/update-order",authCheck,adminCheck,UpdateOrder)
module.exports = router;