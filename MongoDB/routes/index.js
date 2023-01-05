const express=require('express');
const router=express.Router();


//Login/landing
//  GET/
router.get('/',(req,res)=>{
    res.render('login',{
        layout:'login'
    })
})


//Dashboard
//@r  GET /dashboard
router.get('/dashboard',(req,res)=>{
    res.render('dashboard')
});

module.exports=router