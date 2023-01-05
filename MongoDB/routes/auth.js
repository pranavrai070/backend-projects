const express=require('express');
const passport=require('passport');
const router=express.Router();


// Auth with gogle
//  GET /auth/google
router.get('/google',passport.authenticate('google',{scopes:['profile']}));


// Google auth callback
//@r  GET /auth/google/callback
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>{
    res.redirect('/dashboard')
});

module.exports=router