console.log("in signup")
const express=require('express')
const router=express.Router();
console.log("going to import db")
const mongoose=require('../db')
console.log("imported db");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User=require('../userSchema')
const { body, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken')
router.post('/',body('email','Invalid Email').isEmail(),body('password','Password Length Should be minimum 5').isLength({min:5}),async (req,res)=>{
    
    // res.send({reqBody:req.body});
    // return;
    console.log(req.body);
    console.log("in signup");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("voidlaaaa");
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("hmmmm");
    const currFirstName=req.body.firstName;
    const currLastName=req.body.lastName;
    const currEmail=req.body.email;
    const currPassword=req.body.password;
    const address=req.body.address;
    const salt=await bcrypt.genSalt(saltRounds);

    let securedPassword=await bcrypt.hash(currPassword,salt);

    console.log("==========")
    console.log(currFirstName,currLastName,currEmail,securedPassword)
    const currUser=new User({
        firstName:currFirstName,
        lastName:currLastName,
        email:currEmail,
        password:securedPassword,
        address:address
    })
    try{
        const inserted=await currUser.save();
        res.json({
            'inserted':true
        })
    }
    catch(err){
        res.status(400).json({"errors": err});
    }
    
})


module.exports=router;