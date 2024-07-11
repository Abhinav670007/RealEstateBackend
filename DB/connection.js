//import mongoose 
const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URL

mongoose.connect(connectionString).then(()=>{
    
     console.log('Mongodb Atlas successfully connected with backend'); 
  }).catch((err)=>{
      console.log('Mongodb connection failed due to'+err); 
  })




