const express = require("express");
const { CreateProduct,
    getProductRelevant,VoteStarProduct,
    getOneProduct,getProductCount,filterProduct,
    UpdateProduct,findOneProduct,getAllProducts,DeleteProduct,getAllProductsManh } = require("../controller/product");
const router =  express.Router();
const {adminCheck,authCheck} = require('../mildware/auth')

router.post("/create-product-admin",adminCheck,authCheck,CreateProduct)
router.get("/get-product-count-admin",getProductCount)

router.post("/get-allproduct-admin",getAllProducts)

router.post("/get-allproduct-user",getAllProductsManh)
router.post("/delete-product-admin/:slug",adminCheck,authCheck,DeleteProduct)
router.post("/find-one-product",authCheck,findOneProduct)

router.post("/update-product-admin",adminCheck,authCheck,UpdateProduct)

router.post("/get-product",getOneProduct)
router.post("/get-product-relevant",getProductRelevant)
router.post("/voting-star",authCheck,VoteStarProduct)

router.post("/filters-product",filterProduct)

module.exports = router;