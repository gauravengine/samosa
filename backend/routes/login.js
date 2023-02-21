const express=require('express')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const User=require('../userSchema')
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const pkey="HelloWorld12sdf4"
router.post('/',body('email','Invalid Email').isEmail(),body('password','Password Length Should be minimum 5').isLength({min:5}),async (req,res)=>{
	const errors = validationResult(req);
	console.log("********")
	console.log(req.body.email,req.body.password);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const passedEmail=req.body.email
	const passedPassword=req.body.password
	try{
		let userData=await User.findOne({email:passedEmail});
		if(!userData){
			res.status(404).json({'message': 'passed email does not exists'});
			return ;
		}

		const isEqual=await bcrypt.compare(passedPassword, userData.password);
		if(isEqual){
			const data={
				user:{
					id:userData.id
				}
			}
			const authToken=jwt.sign(data,pkey)
			res.json({'login':true,'authToken':authToken});
		}
		else{
			res.status(404).json({'login':false});
			return ;
		}
	}
	catch (err){
		res.status(404).json({'message':err});
	}
})


module.exports=router