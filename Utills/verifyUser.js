const jwt = require('jsonwebtoken')
const errHandler = require('./Error')


 const verifyUser = (req,res,next)=>{
   // console.log('verifyUser middleware is being executed');
    const token = req.cookies.access_token
    console.log(token);

    if(!token) return next(errHandler(401, 'unauthrized'))

       jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errHandler(403,'forbidden'))

            req.user = user
            next()
       })
}

module.exports = verifyUser