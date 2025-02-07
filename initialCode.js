import express from 'express'
import mongoose from 'mongoose'

import jwt from 'jsonwebtoken'

import GadgetRouter from './routes/GadgetRouter.js'

const jwt_secret='abcd'

const app=express()

app.use(express.json())

async function main(){
   await mongoose.connect("mongodb://localhost:27017/Assignment")
}

main().then(()=>{
    console.log('connected to db')
}).catch((err)=>{
    console.log(err)
})


// Routes

// GET /gadgets - Retrieve a list of all gadgets with mission success probability
app.get('/gadgets',async(req,res)=>{
    try{
        const gadgets=await GadgetModel.find() ;
        const missionSuccessProbabilityOfGadget=`${Math.floor(Math.random()*101)}%`
        const gadgetsWithProbability = gadgets.map(gadget => ({
            ...gadget.toObject(),
            missionSuccessProbabilityOfGadget,
          }));
        res.status(200).json(gadgetsWithProbability)
    }catch(err){
        res.status(500).json({error:'failed to retrieve gadgets'})
    }
})

//post /gadgets ->add new gadget with random codename
app.post('/gadgets',async(req,res)=>{
    try{
        const {name}=req.body ;
        if(!name){
            return res.status(400).json({error:'gadget name is required'})
        }
        const codenames=['The Nightingale', 'The Kraken', 'The Phoenix', 'The Shadow', 'The Scorpion'];
        const randomCodeName=codenames[Math.floor(Math.random()*codenames.length)]

        const newGadget=new GadgetModel({
            id:uuidv4(),
            name:`${randomCodeName}-${name}`
        })
        await newGadget.save()
        res.status(201).json(newGadget)
    }catch(err){
        res.status(500).json({error:'failed to post gadget'})
    }
})

//patch -> /gadgets/:id -> update an existing gadget information
app.patch('/gadgets/:id',async(req,res)=>{
    try{
         const {id}=req.params ;
         //const findGadgetById=await GadgetModel.findById(id)
         let updatedGadget= await GadgetModel.findByIdAndUpdate(id, {...req.body.gadget},{ new: true }) // Return the updated document);
         if(!updatedGadget){
            return res.status(404).json({error:'gadget not found '})
         }
         res.status(200).json(updatedGadget)
    }catch(err){
         res.status(500).json({error:'failed to update the gadget'})
    }
})

//delete -> /gadgets/:id -> mark status of gadget as "Decommissioned"
app.delete('/gadgets/:id',async(req,res)=>{
    try{
      const {id}=req.params ;
      const gadget=await GadgetModel.findOne({id})
      if(!gadget){
        return res.status(404).json({error:'gadget not found'})
      }
      gadget.status='Decommissioned';
      gadget.decommissionedAt=new Date();
      await gadget.save()

      res.status(200).json(gadget)
    }catch(err){
        res.status(500).json({error:'failed to change status of gadget in inventory'})
    }
})

//post /gadgets/:id/self-destruct -Trigger a self-destruct sequence
app.post('/gadgets/:id/self-destruct',async(req,res)=>{
    try{
      const {id}=req.params ;
      const gadget=await GadgetModel.findOne({id})
      if(!gadget){
        return res.status(404).json({error:'gadget not found'})
      }
      const confirmationCode=Math.floor(100000 + Math.random() * 900000) ;// Random 6-digit code
      gadget.status='Destroyed'
      await gadget.save()
      res.status(200).json({message:'self-destrcut sequence initiated',confirmationCode})
    }catch(err){
       res.status(500).json({error:'Failed to trigger self-destruct sequence' })
    }
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



