import { Router } from "express";
import { createSale } from "../controllers/salesController";
import { authenticate } from "../middleware/auth";

export const salesRouter = Router();
salesRouter.post("/", authenticate, createSale);