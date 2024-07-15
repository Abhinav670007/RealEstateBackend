const Listing = require("../models/listingModel")



exports.CreateListing = async (req,res,next)=>{
    try {
       const listing = await Listing.create(req.body) 
        return res.status(200).json(listing)
    } catch (error) {
        next(error)
        console.log(error);
    }
}