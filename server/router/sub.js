const express = require("express");
const { CreateSub ,getAllSub,deleteSub,getAllSubUser,findCates,getAllSubs,findOneSub,UpdateSub,findOneSubforProduct,findSubs} = require("../controller/sub");
const router = express.Router();
const {adminCheck,authCheck} = require('../mildware/auth')

router.post("/create-sub",adminCheck,authCheck,CreateSub)
router.post("/getall-sub",adminCheck,authCheck,getAllSub)
router.post("/delete-sub",adminCheck,authCheck,deleteSub)
router.post("/find-sub",adminCheck,authCheck,findOneSub)

router.post("/find-subs",adminCheck,authCheck,findSubs)

router.put("/update-sub",adminCheck,authCheck,UpdateSub)

router.post("/find-subs-for-product",authCheck,findOneSubforProduct)
router.get("/getall-subs",getAllSubs)
router.post("/find-cates",findCates)
router.post("/getall-sub-user",getAllSubUser)
module.exports = router;