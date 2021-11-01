const express=require('express');
const router=express.Router();
const checkCandidateVerification=require('../controllers/candidateController');
const { loginView,loginHR,sendOTP }= require('../controllers/hrController');

router.get('/hr',loginView);
router.post('/hr',loginHR);
router.post('/verify',checkCandidateVerification);
router.post('/hr/sendOTP',sendOTP);

module.exports=router;