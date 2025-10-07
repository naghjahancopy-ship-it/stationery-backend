import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";
import { authRouter } from "./routes/authRoutes";
import { productRouter } from "./routes/productRoutes";
import { serviceRouter } from "./routes/serviceRoutes";
import { salesRouter } from "./routes/salesRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/services", serviceRouter);
app.use("/api/sales", salesRouter);

// basic error handler
app.use((err:any, req:any, res:any, next:any) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

export default app;