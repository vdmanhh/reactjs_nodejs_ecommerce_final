const Wishlish = require('../model/wishlish')
exports.createWish= async(req,res)=>{
    // console.log('kq=>',req.body.user);
    const {email,product}=req.body.user
    const name_user = req.body.user.name
    const images = product.images;
    const name_product = product.name
    const slug = product.slug
    const description = product.description
    const findWish = await Wishlish.findOne({slug}).exec();
    if(findWish){
        res.json({
            kq : 'oke'
        })
    }
    else {
        const wish = await new Wishlish({
            email,name_user,images,name_product,slug,description
        }).save();
        res.json({
            kq : 'oke'
        })
    }
  

}
exports.getWishlish=async(req,res)=>{
    console.log(req.body.user);
    const {name} = req.body.user
    const wish = await Wishlish.find({name_user : name}).exec();
    res.json(wish)
}

exports.deleteWish=async(req,res)=>{
    console.log(req.body.user);
    const {slug} = req.body.user
    const wish = await Wishlish.findOneAndDelete({slug}).exec();
    res.json({
        kq :'oke'
    })
}