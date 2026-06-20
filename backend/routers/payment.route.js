import express from 'express';
import { createPayment, getPayments,generateInvoice,paymentById,approvePayment } from '../controllers/payment.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router=express.Router();

// http://localhost:3000/payments/create
router.post('/create',verifyToken, createPayment);


//http://localhost:3000/payments/get_payments
router.get('/get_payments', verifyToken, getPayments);


// http://localhost:3000/payments/invoice/:paymentId
router.get('/invoice/:paymentId', verifyToken, generateInvoice);

// http://localhost:3000/payments/my-payments
router.get('/my-payments', verifyToken, paymentById);

// http://localhost:3000/payments/approve/:paymentId
router.put('/approve/:paymentId', verifyToken, approvePayment);

export { router as paymentRouter };