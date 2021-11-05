const Product = require("../model/product")
const slugify = require("slugify")
const User = require('../model/user')
exports.CreateProduct = async (req, res) => {

        const { name,
                description,
                price, address,
                states,
                shipping,
                category,
                sub,
                images,
                discount } = req.body.user.values;
        const product = await new Product({
                name, description,
                price, address,
                states, shipping,
                category, sub, images, discount, slug: slugify(name)
        }).save();
        try {
                res.json({
                        product,
                        kq: "oke"
                })
        } catch (error) {
                console.log("tao product ko thanh cong");
        }
}

exports.getProductCount = async (req, res) => {
        const total = await Product.find({}).estimatedDocumentCount().exec();
        res.json(total)
}


exports.getAllProducts = async (req, res) => {
        const { sort, order, page } = req.body.user;
        console.log(sort, order, page);
        const perPage = 8;
        const currentPage = page || 1;
        const product = await Product.find({})
                .skip((currentPage - 1) * perPage)
                .populate("category")
                .populate("sub")
                .sort([[sort, order]])
                .limit(perPage)
                .exec()
        try {
                res.json(product)
        } catch (error) {
                console.log("ko lay dc product");
        }
}
// 
exports.getAllProductsManh = async (req, res) => {
        const { sort, order, page } = req.body.user;
        console.log(sort, order, page);
        const perPage = 12;
        const currentPage = page || 1;
        const product = await Product.find({})
                .skip((currentPage - 1) * perPage)
                .populate("category")
                .populate("sub")
                .sort([[sort, order]])
                .limit(perPage)
                .exec()
        try {
                res.json(product)
        } catch (error) {
                console.log("ko lay dc product");
        }
}



// 
exports.DeleteProduct = async (req, res) => {
        const { slug } = req.body.user;
        const product = await Product.findOneAndDelete({ slug }).exec();
        try {
                res.json({
                        kq: 'oke'
                })
        } catch (error) {
                console.log('ko xoa dc product');
        }
}

exports.findOneProduct = async (req, res) => {
        const { slug } = req.body.user;
        const product = await Product.findOne({ slug }).exec();
        try {
                res.json({
                        product,
                        kq: 'oke'
                })
        } catch (error) {
                console.log('ko tim dc product');
        }
}




exports.UpdateProduct = async (req, res) => {
        console.log("product : =>", req.body.user);
        const { slug } = req.body.user
        const { name,
                description,
                price, address,
                states,
                shipping,
                category,
                sub,
                images,
                discount } = req.body.user.values;
        const product = await Product.findOneAndUpdate(
                { slug },
                {
                        name, description,
                        price, address,
                        states, shipping,
                        category, sub, images, discount, slug: slugify(name)
                },
                { new: true }
        )
                .exec();
        try {
                res.json({

                        kq: "oke"
                })
        } catch (error) {
                console.log("tao product ko thanh cong");
        }
}
exports.getOneProduct = async (req, res) => {
        console.log('slug : ', req.body);
        const { slug } = req.body.user;
        const product = await Product.findOne({ slug }).exec();
        try {
                res.json(product)
        } catch (error) {
                console.log("ko tim thay product");
        }
}
exports.getProductRelevant = async (req, res) => {
        // console.log('req.body.user : ',req.body.user);
        const { sub } = req.body.user
        const allProduct = await Product.find({ sub }).exec();
        try {
                // console.log('allProduct : ',allProduct);
                res.json(allProduct)
        } catch (error) {
                console.log('ko lay dc produc');
        }
}
exports.VoteStarProduct = async (req, res) => {

        const { email, name } = req.body.user
        const star = req.body.user.newStar
        console.log('star:', star);
        const user = await User.findOne({ email }).exec();
        const product = await Product.findById({ _id: name }).exec();
        let existingRatingObject = product.ratings.find(
                (ele) => ele.postedBy.toString() === user._id.toString()
        );

        // if user haven't left rating yet, push it
        if (existingRatingObject === undefined) {
                let ratingAdded = await Product.findByIdAndUpdate(
                        product._id,
                        {
                                $push: { ratings: { star, postedBy: user._id } },
                        },
                        { new: true }
                ).exec();
                console.log("ratingAdded", ratingAdded);
                res.json(ratingAdded);
        }
        else {
                // if user have already left rating, update it
                const ratingUpdated = await Product.updateOne(
                        {
                                ratings: { $elemMatch: existingRatingObject },
                        },
                        { $set: { "ratings.$.star": star } },
                        { new: true }
                ).exec();
                console.log("ratingUpdated", ratingUpdated);
                res.json(ratingUpdated);
        }
}

const handleQuery = async (req, res, query) => {
        // 
        console.log('m:', query);
        const products = await Product.find({ $text: { $search: query } })
                .populate("category", "_id name")
                .populate("sub", "_id name")
                .populate("postedBy", "_id name")
                .exec()
        res.json(products)
}
const handlePricee = async (req, res, low, height) => {
        const product = await Product.find({
                price: {
                        $gte: low,
                        $lte: height,
                },
        })
                .populate("category", "_id name")
                .populate("sub", "_id name")
                .populate("postedBy", "_id name")
                .exec();
        res.json(product)
}
const handleCate = async (req, res, category) => {
        const catee = await Product.find({ category: category }).exec();
        res.json(catee)
}
const handleSub = async (req, res, sub) => {
        const catee = await Product.find({ sub: sub }).exec();
        res.json(catee)
}

const handleStars = (req,res,star)=>{
        Product.aggregate([
          {
            $project: {
              document: "$$ROOT",
              // title: "$title",
              floorAverage: {
                $floor: { $avg: "$ratings.star" }, // floor value of 3.33 will be 3
              },
            },
          },
          { $match: { floorAverage: star } },
        ])
        .limit(12)
          .exec((err, aggregates) => {
            if (err) console.log("AGGREGATE ERROR", err);
            Product.find({ _id: aggregates })
              .populate("category", "_id name")
              .populate("sub", "_id name")
              .populate("postedBy", "_id name")
              .exec((err, products) => {
                if (err) console.log("PRODUCT AGGREGATE ERROR", err);
                res.json(products);
              });
          });
      
      }
exports.filterProduct = async (req, res) => {
        console.log(req.body.arg);
        const { query, low, height, category, sub, star } = req.body.arg
        if (query) {
                await handleQuery(req, res, query)
        }
        if (height && low) {
                await handlePricee(req, res, low, height)
        }
        if (category) {
                await handleCate(req, res, category)

        }

        if (sub) {
                await handleSub(req, res, sub)
        }

        if (star) {
                await handleStars(req, res, star)
        }
}