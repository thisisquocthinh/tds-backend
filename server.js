import express from "express";
import KeyRouter from "./app/routes/key.js";
import UserRouter from "./app/routes/userRouter.js";
import AdminRouter from "./app/routes/adminRouter.js";
import PaymentRouter from "./app/routes/paymentRouter.js";
import WebhookRouter from "./app/routes/webhookRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";

var allowlist = ["http://localhost:5173"];

const corsOptions = {
  origin: allowlist,
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", [
  UserRouter,
  AdminRouter,
  KeyRouter,
  PaymentRouter,
  WebhookRouter,
]);

// Khởi động server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
