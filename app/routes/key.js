import express from "express";
import KeyCashController from "../controllers/KeyCashController.js";
import { authenticateCookie } from "../middleware/middleware.js";

const router = express.Router();

const keyController = new KeyCashController();

router.post("/key/generate", keyController.generatedKey);
router.get("/key/get-list", authenticateCookie, keyController.getListKey);
router.get("/key/get", keyController.checkedKey);

export default router;
