const { default: mongoose } = require("mongoose");



const userScheme = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },password:{
        type:String,
        require:true,
    },
    avatar:{
        type:String,
        default:"https://c8.alamy.com/comp/TC2FPE/young-man-avatar-cartoon-character-profile-picture-TC2FPE.jpg"
    },
})

userScheme.virtual('id').get(function() {
    return this.id.toHexString();
});

userScheme.set('toJSON', {
    virtuals: true,
});

const User = mongoose.model('User',userScheme)

module.exports=User