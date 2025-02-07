import mongoose from 'mongoose'
import {v4 as uuidv4} from 'uuid'

const gadgetSchema=new mongoose.Schema({
    id:{
        type:String,
        default:uuidv4(),
    },
    name:{
        type:String,required:true
    },
    status:{
        type:String,
        enum:['Available', 'Deployed', 'Destroyed', 'Decommissioned'],
        default:'Available'
    }
},{timestamps: true,})

const GadgetModel=mongoose.model("GadgetModel",gadgetSchema)

export default GadgetModel