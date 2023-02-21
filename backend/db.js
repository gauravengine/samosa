console.log("in db.js")
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
const uri='mongodb+srv://gengi:process.env.URI@cluster0.603tfc8.mongodb.net/samosadb?retryWrites=true&w=majority';
console.log(Date.now())
mongoose.connect(uri).then(()=>{
    console.log('connected to mongodb atlas');   
    console.log(Date.now());
});

module.exports=mongoose