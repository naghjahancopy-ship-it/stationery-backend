import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { Service } from "../entity/Service";

const repo = () => AppDataSource.getRepository(Service);

export const listServices = async (req: Request, res: Response) => {
  const services = await repo().find();
  res.json(services);
};

export const createService = async (req: Request, res: Response) => {
  const { name, price_per_unit, duration_min } = req.body;
  const s = repo().create({ name, price_per_unit, duration_min });
  await repo().save(s);
  res.status(201).json(s);
};

export const updateService = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const s = await repo().findOneBy({ id });
  if(!s) return res.status(404).json({ error: "Not found" });
  s.name = req.body.name ?? s.name;
  s.price_per_unit = req.body.price_per_unit ?? s.price_per_unit;
  s.duration_min = req.body.duration_min ?? s.duration_min;
  await repo().save(s);
  res.json(s);
};

export const deleteService = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await repo().delete(id);
  res.status(204).send();
};