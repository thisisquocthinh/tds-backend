import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

const userController = new UserController();

// for index

router.get("/user/login", userController.loginAction);

export default router;
