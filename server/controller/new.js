const New = require('../model/new')
const slugify = require('slugify')
exports.createNew=async(req,res)=>{
    const {title,image,contend} = req.body
  
    const news = new New({title,image,contend,slug: slugify(title)}).save()
    try {
            res.json({
                kq : 'oke'
            })
    } catch (error) {
        console.log('ko them bai viet duoc');
    }
}
exports.getNew=async (req,res)=>{
    const news = await New.find({}).exec();
    res.json(news)
    
}
exports.findNew=async (req,res)=>{
    const {slug} = req.body
    const neww = await New.findOne({slug}).exec()
    res.json(neww)
}