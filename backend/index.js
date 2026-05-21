
import express from 'express';
// import cors from 'cors';
// import {createUserTable } from './models/user.model.js';
import { createUsersTable } from './models/userModel.js';
import { createResourceTable } from './models/resourceModel.js';
import cors from 'cors';
import { userRouter } from './routers/user.route.js';
import { resourceRouter } from './routers/resources.js';

import dotenv from 'dotenv';
import { paymentRouter } from './routers/payment.route.js';

dotenv.config();

const app=express();

// await createUsersTable();
// await createResourceTable();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/upload', express.static('upload/resource-image')); // Serve static files from the "uploads" directory  
app.use(cors());
app.use("/users", userRouter);
app.use("/resources", resourceRouter);
app.use("/payments", paymentRouter);

const PORT=5000;    

app.listen(PORT , () => console.log(`Server is running on port ${PORT}`)); 