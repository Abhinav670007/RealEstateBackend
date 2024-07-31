// logic to resolve the request
const bcryptjs = require('bcryptjs')
const  User = require("../models/userModel")
const  errHandler  = require('../Utills/Error')
const jwt = require('jsonwebtoken')

exports.signUp = async (req,res)=>{
    const {username,email,password}=req.body
    const hashedpassword = bcryptjs.hashSync(password,10)
     const existUser = await User.findOne({email})
        if(existUser){
            res.status(406).json('already exist')
        }else{
            //create an obj for model
            const newUser = new User({
                username, 
                email, 
                password:hashedpassword
            }) 
            //save function in mongoose to store permanantly in mongo db
           await newUser.save()
             //response
        res.status(200).json("Successfully Registerd")
        }
} 
      //Sign In Function
exports.login=async(req,res,next)=>{
    const {email,password}=req.body
    try {
     const validUser = await User.findOne({email})
     if(!validUser) return next(errHandler(404,'user not found')) 
       const validPassword = bcryptjs.compareSync(password,validUser.password) 
     if(!validPassword) return next(errHandler(401,'Wrong credentials!'))
         const token = jwt.sign({ id:validUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
    res.cookie('access_token', token, {
        httpOnly: true,
        maxAge :1024 * 60 * 60 * 24 * 3,
        secure: true,
        sameSite:'none'
      });
  
      res.status(200).json(validUser)
    } catch (error) {
     next(error)
    }
 }
 
        //Google Sign In Function
exports.google = async(req,res,next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        console.log(user);
        if(user){
            const token = jwt.sign({ id:user._id},process.env.JWT_SECRET)
            res.cookie('access_token',token, {httpOnly:true}).status(200).json(user) 
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8)
            const hanshedPassword = bcryptjs.hashSync(generatedPassword,10)
            const newUser = new User({username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),email:req.body.email,password:hanshedPassword,avatar:req.body.photo})
            await newUser.save()
            const token = jwt.sign({ id:newUser._id},process.env.JWT_SECRET)
            // res.cookie('access_token',token, {httpOnly:true}).status(200).json(newUser)
            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge :1024 * 60 * 60 * 24 * 3,
                secure: true,
                sameSite:'none'
              });
          
              res.status(200).json(newUser)
        }
    } catch (error) {
        next(error)
        
    }
}
         
            //User Update Function

exports.updateUser = async(req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errHandler(404,'you can only update your account'))
       try {
            if(req.body.password){
                req.body.password =  bcryptjs.hashSync(req.body.password,10)
            }
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:{
                  username:req.body.username,
                  email:req.body.email,
                  password:req.body.password,
                  avatar:req.body.avatar  
                }
            },{new:true})
           const {password,...rest} = updateUser._doc 
           res.status(200).json(rest)
       } catch (error) {
        next(error)
       } 
}


exports.deleteUser = async (req, res, next) => {
    
    if (req.user.id !== req.params.id) {
        return next(errHandler(404, 'You can only delete your own account'));
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token')
        res.status(200).json('User has been deleted...')
    } catch (error) {
        next(error);
    }
};

exports.signOut = async (req,res,next)=>{
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
      } catch (error) {
        next(error);
      }
}