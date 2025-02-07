import express from 'express'
import mongoose from 'mongoose'

import GadgetRouter from './routes/GadgetRouter.js'


const app=express()

app.use(express.json())

//connecting to mongoDB 
async function main(){
   await mongoose.connect("mongodb://localhost:27017/Assignment")
}

main().then(()=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})

app.use("/gadgets",GadgetRouter)

app.listen(3000,()=>{
    console.log('app is listening on port 3000')
})




// JWT auth  for protecting my apis 

const jwtAuthenticate=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]   //split used to seperate token from Bearer  otherwise tokne is generated like this Bearer Jwt-Token
    if(!token){
        return res.status(401).json({error:"access denied no token provided"})
    }
    try{
         const decoded=jwt.verify(token,jwt_secret)
         req.user=decoded 
        next()
    }catch(err){
        res.status(400).json({error:'invalid token'})
    }
}



