const nodemailer=require('nodemailer');
const bodyParser=require('body-parser');

const sendMail=(subject,recepient,text,attachment,date,time,otp)=>{

    var smtpTransport=nodemailer.createTransport({
       service:'gmail',
       host:'smtp.gmail.com',
       auth:{
           user:'*******************',
           pass:'***********************'
       }
    });

    var mailOption={
        from:'lodekib@gmail.com',
        to:`${recepient}`,
        subject:`${subject}`,
        text:`${text}.The interview is set on ${date} at ${time}.See you then.The session ID  is ${otp}.\nNote that the OTP will be required for verification.`,
        // attachments:[{
        //     content:`${attachment}`
        // }]
    };

    smtpTransport.sendMail(mailOption,function(error,response){
        if(error){
            console.log(error);
        }else{
            console.log('Email sent successfully');
        }
    });
}

module.exports=sendMail;
