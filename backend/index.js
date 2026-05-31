import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createUsersTable } from './models/userModel.js';
import { createResourceTable } from './models/resourceModel.js';
import cors from 'cors';
import { userRouter } from './routers/user.route.js';
import { resourceRouter } from './routers/resources.js';
import { createPaymentTable } from './models/PaymentModel.js';

import dotenv from 'dotenv';
import { paymentRouter } from './routers/payment.route.js';

dotenv.config();

const app=express();

await createUsersTable();
await createResourceTable();
await createPaymentTable();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));  
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use("/users", userRouter);
app.use("/resources", resourceRouter);
app.use("/payments", paymentRouter);

const PORT=5000;    

app.listen(PORT , () => console.log(`Server is running on port ${PORT}`)); 