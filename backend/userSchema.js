console.log("in userSchema")
const mongoose=require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
    firstName: {
        type: String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,        
    },
    password:{
        type:String,
        required:true,
  
    },
    address:{
        type:String,
    }
})

const User=mongoose.model('User',userSchema);
module.exports=User