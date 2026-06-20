import express from 'express';
import { createResource, getAllResources,getResourceById,updateResource,deleteResource,getResourceAnalytics,getResourceRevenueAnalytics,getTotalRevenue } from '../controllers/resource.cotroller.js';
import { upload } from '../middleware/upload.js';
import { verifyToken } from '../middleware/verifyToken.js';

const route=express.Router()
// http://localhost:3000/resources/create

route.post("/add", upload.single("image"), createResource)
route.put("/update/:id", upload.single("image"), updateResource)
route.delete("/delete/:id", deleteResource)
// http://localhost:3000/resources/fetch
route.get("/fetch",getAllResources)
// http://localhost:5000/resources/analytics
route.get("/get_analytics",  getResourceAnalytics);
route.get("/resource_revenue", getResourceRevenueAnalytics);
route.get("/total_revenue", getTotalRevenue);

route.get("/:id",getResourceById)




export {route as resourceRouter};