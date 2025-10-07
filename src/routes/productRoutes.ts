import { Router } from "express";
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController";
import { authenticate } from "../middleware/auth";

export const productRouter = Router();
productRouter.get("/", listProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", authenticate, createProduct); // require auth for create/update/delete
productRouter.put("/:id", authenticate, updateProduct);
productRouter.delete("/:id", authenticate, deleteProduct);