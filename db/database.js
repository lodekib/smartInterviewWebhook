require('dotenv').config();
const mongoose=require('mongoose');

const connectDB=()=>{
const database=process.env.DATABASE_URL;
    mongoose.connect(database,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then(()=>console.log('Webhook DB connected'))
      .catch(err=>console.log(err));
}

module.exports=connectDB;

