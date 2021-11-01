const otpGenerator=require('otp-generator');
const sendMail =require('../mailing/email');
const HR=require('../models/hr_model');
const OTP=require('../models/otp_model');

const loginView=(req,res)=>{
    res.render('hr_login');
}



const loginHR = (req, res) => {
    const { email, password } = req.body;  
    //Required
    if (!email || !password) {
      
      res.render("hr_login", {
        message:'Please fill in all the fields',
        isLogin:false
      });
    } else {
      HR.findOne({email:email},function(err,hr){
             if(err) {
               res.render('hr_login',{
                 message:'An error occured',
                 isLogin:false
               });
               console.log('An error ocurred');
             }
             if(hr.password !=password){
             res.render('hr_login',{
              message:'Incorrect user credentials',
              isLogin:false
             });
             console.log(`${password} is not equal to ${hr.password}`)
            }else{
            res.render('dashHR',{
              message:'Login Successful!',
              isLogin:true
            })
            console.log('log in successful');
            
          }
        
      })
      
     
    }
  };

  const sendOTP=async(req,res)=>{
    const {email, date,description, time }=req.body;
    var otp=otpGenerator.generate(4,{digits:true,alphabets:false,upperCase:false,specialChars:false});
    var userOTP=new OTP({email,otp});
    userOTP.save();
    console.log(otp);


   await sendMail(
      'INVITATION FOR THE MACHINE LEARNING INTERVIEW JOB',
      email,
      description,
      'sample attachement',
      date,
      time,
      otp
    );
   
  }
  


  module.exports={
    loginHR,
    loginView,
    sendOTP
  }