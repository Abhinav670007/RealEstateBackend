const Listing = require("../models/listingModel")
const  errHandler  = require('../Utills/Error')
const  User = require("../models/userModel")
const mongoose = require('mongoose');


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


exports.editUserList = async (req,res,next)=>{
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next(errHandler( 404,'listing not founde'))
    }
    if(req.user.id !== listing.useRef){
        return next(errHandler( 401,'you can only update your own account'))
    }
    try {
      const UpdateListing =   await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}  //response with updated list
      )
      res.status(200).json(UpdateListing)
    } catch (error) {
        next(error)
    }
}

exports.getListing =async(req,res,next)=>{
try {
    const listing = await Listing.findById(req.params.id)
    if(!listing){
        return next(errHandler(404,'listing not found'))
    }
    res.status(200).json(listing)
} catch (error) {
    next(error)
}
}

exports.getUser =async (req,res,next)=>{
    try {
        const user  = await User.findById(req.params.id)
        if(!user){
            return next(errHandler(404,'user not found'))
        }
        const {password:pass, ... rest} = user._doc
    
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
   
}

// exports.getListings=async (req,res,next)=>{
// try {
//     const limit = parseInt(req.query.limit) || 9
//     const startIndex = parseInt(req.query.startIndex) || 0

//     let offer = req.query.offer

//     if(offer === undefined || offer === 'false'){
//         offer = {$in : [false,true]}  //we want both true and false
//     }

//     let furnished = req.query.furnished;

//     if (furnished === undefined || furnished === 'false') {
//       furnished = { $in: [false, true] };
//     }

//     let parking = req.query.parking;

//     if (parking === undefined || parking === 'false') {
//       parking = { $in: [false, true] };
//     }

//     const type = req.query.type || all

//     if (type === undefined || type === 'all') {
//       type = { $in: ['sale', 'rent'] };
//     }

//     const searchTerm = req.query.searchTerm || '';

//     const sort = req.query.sort || 'createdAt';

//     const order = req.query.order || 'desc';   //default desc

//      if (typeof searchTerm !== 'string') {
//       return res.status(400).json({ success: false, message: 'Invalid SearchTerm' });
//     }

//     const listings = await Listing.find({
//         name: { $regex: searchTerm, $options: 'i' }, //regex is seraching method . i search both upper and lower
//         offer,
//         furnished,
//         parking,
//         type,
//       }).sort({ [sort]: order })
//       .limit(limit)
//       .skip(startIndex);

//       return res.status(200).json(listings)

// } catch (error) {
//     next(error)
// }
// }

exports.getListings =async (req, res, next)=>{
    const { SearchTerm, type, parking, furnished, offer, sort, order, limit, startIndex } = req.query;
  const query = {
    name: { '$regex': SearchTerm || '', '$options': 'i' },
    type: type !== 'all' ? type : { '$exists': true },
    parking: parking === 'true' ? true : { '$exists': true },
    furnished: furnished === 'true' ? true : { '$exists': true },
    offer: offer === 'true' ? true : { '$exists': true }
  };

//   console.log('Received query parameters:', req.query);
//   console.log('Constructed query object:', JSON.stringify(query, null, 2));
  try {

    const listings = await Listing.find(query)
      .sort({ [sort]: order === 'desc' ? -1 : 1 })
      .limit(parseInt(limit))
      .skip(parseInt(startIndex));
    // console.log('Query result:', listings);
    res.json(listings);
  } catch (error) {
    // console.error('Error fetching listings:', error);
    res.status(500).send('Server Error');
  }
}