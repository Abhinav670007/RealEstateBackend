const Listing = require("../models/listingModel")
const  errHandler  = require('../Utills/Error')
const  User = require("../models/userModel")



exports.CreateListing = async (req,res,next)=>{
    try {
       const listing = await Listing.create(req.body) 
        return res.status(200).json(listing)
    } catch (error) {
        next(error)
        console.log(error);
    }
}

exports.getUserListing =async (req,res,next)=>{
   
    if(req.user.id === req.params.id){
        try {
            const listing = await Listing.find({useRef : req.params.id})
            res.status(200).json(listing)
        } catch (error) {
            next(error)
        } 
    }else{
        return next(errHandler(401,'you can only visit your listing'))
    }
}

exports.deleteUserList = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next(404,'listing not found !')
    }
    if(req.user.id != listing.useRef){   //for checking user is deleting OG
        return next(401,'you can only delete your own listing')
    }
    try {
        await Listing.findByIdAndDelete(req.params.id)
            res.status(200).json('listing has been deleted')
    } catch (error) {
        next(error)
    }
}