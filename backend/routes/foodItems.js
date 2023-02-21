const express=require('express')
const router=express.Router();
const fooditem=require('../models/foodItemsSchema')

router.get('/',async (req,res)=>{
	console.log("---getting items at");
	const arr=await fooditem.find({});
	res.json({'foods': arr});
})
module.exports=router