const Sub = require("../model/subcategory")
const slugify = require("slugify")
const Product = require('../model/product')
exports.CreateSub = async(req,res)=>{
    const {name,parent}=req.body.user;
    const image =req.body.user.imagess;
    const sub = await new Sub({image,name,parent,slug :slugify(name)}).save();
    try {
        res.json({
            kq : "oke"
        })
        console.log("tao sub thanh cong");
    } catch (error) {
        console.log("create sub ko thanh cong");
    }
}

exports.getAllSub =async (req,res)=>{
    const sub = await Sub.find({}).exec();
    try {
        res.json(sub)
        console.log(" lay dc sub");
    } catch (error) {
        console.log("ko lay dc sub");
    }
}

exports.getAllSubUser =async (req,res)=>{
    const sub = await Sub.find({}).exec();
    try {
        res.json(sub)
        console.log(" lay dc sub");
    } catch (error) {
        console.log("ko lay dc sub");
    }
}



exports.getAllSubs =async (req,res)=>{
    const sub = await Sub.find({}).exec();
    try {
        res.json(sub)
        console.log(" lay dc sub");
    } catch (error) {
        console.log("ko lay dc sub");
    }
}

exports.deleteSub =async (req,res)=>{
    const {slug} = req.body.user
    const sub = await Sub.findOneAndDelete({slug}).exec();
    try {
        res.json({
            kq : "oke"
        })
        console.log(" xoa dc sub");
    } catch (error) {
        console.log("ko xoa lay dc sub");
    }
}

exports.findOneSub =async (req,res)=>{
    const {slug} = req.body.user
    const subb = await Sub.findOne({slug}).exec();
    try {
        res.json({
            subb,
            
        })
        console.log(" lay dc sub");
    } catch (error) {
        console.log("ko lay dc sub");
    }
}


exports.UpdateSub =async (req,res)=>{

    if(req.body.user.parent){
        const {slug,name,parent} = req.body.user
        
        const image =req.body.user.imagess;
        const subb = await Sub.findOneAndUpdate(
            {slug},
            {name,image,parent,slug:slugify(name)},
            {new : true}
        ).exec()
        try {
            res.json({
                kq : "oke",
                
            })
            console.log(" lay dc sub");
        } catch (error) {
            console.log("ko lay dc sub");
        }
    }
    else{
        const {slug,name} = req.body.user
        const parent = req.body.user.parentt
        const image =req.body.user.imagess;
        const subb = await Sub.findOneAndUpdate(
            {slug},
            {name,image,parent,slug:slugify(name)},
            {new : true}
        ).exec()
        try {
            res.json({
                kq : "oke",
                
            })
            console.log(" lay dc sub");
        } catch (error) {
            console.log("ko lay dc sub");
        }
    }
    
}



exports.findSubs =async (req,res)=>{

    const {parent} = req.body.user
    const subb = await Sub.find({parent :parent }).exec();
    try {
        res.json({
            subb,
            
        })
        console.log(" lay dc sub");
    } catch (error) {
        console.log("ko lay dc sub");
    }
}



exports.findOneSubforProduct =async (req,res)=>{
    const {id} = req.body.user
    console.log("id:",id);
    const subb = await Sub.findOne({_id : id}).exec();
    try {
        console.log('subb:',subb);
        res.json(
            subb
            
        )
        console.log(" lay dc sub");
    } catch (error) {
        console.log("ko lay dc sub");
    }
}


exports.findCates =async (req,res)=>{
    const {slug} = req.body.user
    console.log("id:",slug);
    const subb = await Sub.findOne({slug}).exec();
    const getSubss = await Product.find({sub : subb._id}).exec();
    try {
  
        res.json(
            getSubss
            
        )
        console.log(" lay dc sub");
    } catch (error) {
        console.log("ko lay dc sub");
    }
}



