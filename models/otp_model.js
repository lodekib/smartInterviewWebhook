const mongoose=require('mongoose');
const OTP=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    }
});

module.exports=mongoose.model('OTP',OTP);