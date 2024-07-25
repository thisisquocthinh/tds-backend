import express from "express";
import WebhookController from "../controllers/WebhookController.js";

const router = express.Router();

const webhookController = new WebhookController();

// for index

router.post("/webhook-event-handler", webhookController.webhookEventHandler);

export default router;
