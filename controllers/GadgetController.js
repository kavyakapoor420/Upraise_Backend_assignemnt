import {v4 as uuidv4} from 'uuid'
import GadgetModel from '../model/GadgetModel.js';

export const fetchGadgets=async(req,res)=>{
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
}

export const addNewGadget=async(req,res)=>{
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
}

export const updateExistingGadget=async(req,res)=>{
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
}

export const deleteGadget=async(req,res)=>{
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
}

export const triggerSelfDestruct=async(req,res)=>{
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
}