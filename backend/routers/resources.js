import express from 'express';
import { createResource, getAllResources,getResourceById } from '../controllers/resource.cotroller.js';
import { upload } from '../middleware/upload.js';
const route=express.Router()
// http://localhost:3000/resources/create

route.post("/add", upload.single("image"), createResource)
 
// http://localhost:3000/resources/fetch
route.get("/fetch",getAllResources)
route.get("/:id",getResourceById)




export {route as resourceRouter};