import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { Product } from "../entity/Product";

const repo = () => AppDataSource.getRepository(Product);

export const listProducts = async (req: Request, res: Response) => {
  const products = await repo().find();
  res.json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const p = await repo().findOneBy({ id });
  if(!p) return res.status(404).json({ error: "Not found" });
  res.json(p);
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, stock, sku, cost } = req.body;
  const p = repo().create({ name, price, stock, sku, cost });
  await repo().save(p);
  res.status(201).json(p);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { name, price, stock, sku, cost } = req.body;
  const p = await repo().findOneBy({ id });
  if(!p) return res.status(404).json({ error: "Not found" });
  p.name = name ?? p.name;
  p.price = price ?? p.price;
  p.stock = stock ?? p.stock;
  p.sku = sku ?? p.sku;
  p.cost = cost ?? p.cost;
  await repo().save(p);
  res.json(p);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await repo().delete(id);
  res.status(204).send();
};