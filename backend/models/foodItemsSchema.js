const mongoose=require('mongoose')
const {Schema}=mongoose
const portions=new Schema({
	half:String,
	full:String
})
const fooditemSchema=new Schema({
	CategoryName:String,
	name:String,
	img:String,
	options:[portions],
	description:String
})

const fooditem=mongoose.model('fooditem',fooditemSchema)
module.exports=fooditem