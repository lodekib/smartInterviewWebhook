const OTP=require('../models/otp_model');

const checkCandidateVerification=(req,res)=>{
    const { candidateEmail, candidateOTP }=req.body;
    OTP.findOne({email:candidateEmail},function(err,candidate){
        if(candidate.otp == candidateOTP){
            res.status(200).json({
            "verified":true,
            "message":"Welcome to Acer"
            });
        }else{
            res.status(220).json({
                "verified":false,
                "message":"Candidate Verification Failed!"
            });
        }
    })
}

module.exports=checkCandidateVerification;