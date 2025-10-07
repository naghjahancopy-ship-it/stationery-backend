import { Router } from "express";
import { listServices, createService, updateService, deleteService } from "../controllers/serviceController";
import { authenticate } from "../middleware/auth";

export const serviceRouter = Router();
serviceRouter.get("/", listServices);
serviceRouter.post("/", authenticate, createService);
serviceRouter.put("/:id", authenticate, updateService);
serviceRouter.delete("/:id", authenticate, deleteService);