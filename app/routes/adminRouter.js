import express from "express";
import AdminController from "../controllers/AdminController.js";

const router = express.Router();

const adminController = new AdminController();

router.post("/admin/login", adminController.adminLogin);

export default router;
