const express = require("express")
const router = express.Router();
const {adminCheck,authCheck} = require('../mildware/auth')
const {CreateCategory,getAllCategoryUser,getAllCategory,findOneCateforUpdateProduct,deletee,findOneCate,updateCategory,findOneCateforSub} = require("../controller/category")
router.post("/create-category",adminCheck,authCheck,CreateCategory)
router.post("/getall-category",adminCheck,authCheck,getAllCategory)
router.post("/delete-category/:slug",adminCheck,authCheck,deletee)
router.post("/find-category",adminCheck,authCheck,findOneCate)

router.post("/update-category",adminCheck,authCheck,updateCategory)
router.post("/find-category-forsub",adminCheck,authCheck,findOneCateforSub)

router.post("/find-one-category-product",authCheck,findOneCateforUpdateProduct)

router.post("/getall-category-user",getAllCategoryUser)


module.exports = router