import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRepo = () => AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  if(!email || !password) return res.status(400).json({error:"email and password required"});
  const exists = await userRepo().findOneBy({ email });
  if(exists) return res.status(409).json({ error: "User exists" });
  const hash = await bcrypt.hash(password, 10);
  const user = userRepo().create({ email, name, password: hash });
  await userRepo().save(user);
  res.status(201).json({ id: user.id, email: user.email });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await userRepo().findOneBy({ email });
  if(!user) return res.status(401).json({ error: "Invalid credentials" });
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: process.env.JWT_EXPIRES_IN || "1h" });
  res.json({ accessToken: token });
};