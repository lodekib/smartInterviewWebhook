const express=require('express');
const path=require('path');
const routes=require('./routes/schedule');
const connectDB=require('./db/database');
const app=require('./session/session');
require('dotenv').config();
expressApp=express();
const PORT=3330;

connectDB();

expressApp.use(express.static(path.join(__dirname, 'public')));
expressApp.set('view engine','ejs');
expressApp.use(express.urlencoded({extended:false}));
expressApp.use(express.json(),routes,app).listen(PORT,()=> console.log('Assistant Testing...'));


