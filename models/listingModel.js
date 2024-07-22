const  mongoose  = require("mongoose");

const listSchema = new mongoose.Schema(
{
    name:{
        type:String,
        require:true,
    },
    discription:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true,
    },
    regularPrice:{
        type:Number,
        require:true,
    },
    discountPrice:{
        type:Number,
        require:true,
    },
    bathrooms:{
        type:Number,
        require:true,
    },
    bedrooms:{
        type:Number,
        require:true,
    },
    furnished:{
        type:Boolean,
        require:true,
    },
    parking:{
        type:Boolean,
        require:true,
    },
    type:{
        type:String,
        require:true,
    },
    offer:{
        type:Boolean,
        require:true,
    },
    imageUrls:{
        type:Array,
        require:true,
    },
    useRef:{
        type:String,
        require:true,
    }
}

)

const Listing = mongoose.model('Listing', listSchema)

module.exports = Listing