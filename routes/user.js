const express =require("express")
const router =express().router
const User =require('../models/User')

router.get('/signin' ,(req,res)=>{
   res.render('signin')
})
router.get('/signup' ,(req,res)=>{
        res.render("signup")
})
router.post('/signup' ,(req,res)=>{
    const {fullName ,email ,password} =req.body
    User.create({
        fullName,
        email,
        password
    });

    res.redirect("/signin")
})


module.exports =router;