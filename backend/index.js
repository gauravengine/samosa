const express=require('express')
const app=express();
const port=7000;
const signUpHandler=require('./routes/signup')
const loginHandler=require('./routes/login')
const foodItemsHandler=require('./routes/foodItems')
const morgan = require('morgan')
const cors=require('cors');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json())
app.use('/api/signup',signUpHandler)
app.use('/api/login',loginHandler)
app.use('/api/foodItems',foodItemsHandler)

app.all('*',(req,res)=>{
	res.status(404).json({'notFound':'true'});
})
app.listen(port,()=>{
	console.log(`listening on ${port} :)`);
})
