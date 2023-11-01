const express=require('express')
const mongoose=require('mongoose')
const route=require('./Routes/router')
const app=express()

app.use(express.json())
mongoose.set('strictQuery',true)
mongoose.connect('mongodb+srv://group21Database:f8HsIED1oiOyc6yi@karthikcluster.b2ikjot.mongodb.net/Register',{
    useNewUrlParser:true,
}).then(()=>console.log('MongoDb connected'))
.catch((err)=>console.log(err))
app.use('/',route)

app.listen(process.env.PORT || 3000,function(){
    console.log(`connected to port ${process.env.PORT || 3000}`)
})
