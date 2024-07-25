import express from "express";
import PaymentController from "../controllers/PaymentController.js";

const router = express.Router();

const paymentController = new PaymentController();

// for index

router.post("/payment/create-payment", paymentController.createPayment);
router.get("/payment/get-user", paymentController.getTransactions);

export default router;
