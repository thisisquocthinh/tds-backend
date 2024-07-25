import express from "express";
import WebhookController from "../controllers/WebhookController.js";

const router = express.Router();

const webhookController = new WebhookController();

// for index

router.post(
  "/webhook/handler-bank-transfer",
  webhookController.handleBankTransfer
);

router.post("/register-webhook", webhookController.registerWebhook);
router.post("/user-paid", webhookController.userPaid);

export default router;
