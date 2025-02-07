import express from 'express'
import { addNewGadget, deleteGadget, fetchGadgets, triggerSelfDestruct, updateExistingGadget } from '../controllers/GadgetController'

const GadgetRouter=express.Router()

// GET /gadgets - Retrieve a list of all gadgets with mission success probability
GadgetRouter.get("/",fetchGadgets)
//post /gadgets ->add new gadget with random codename
GadgetRouter.post("/",addNewGadget)
//patch -> /gadgets/:id -> update an existing gadget information
GadgetRouter.patch("/:id",updateExistingGadget)
//delete -> /gadgets/:id -> mark status of gadget as "Decommissioned"
GadgetRouter.delete("/:id",deleteGadget)
//post /gadgets/:id/self-destruct -Trigger a self-destruct sequence
GadgetRouter.post("/:id/self-destruct",triggerSelfDestruct)

export default GadgetRouter 