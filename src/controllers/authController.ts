import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({ email, password: hashed, name, role: "user" });
  await userRepo.save(user);
  res.json({ message: "Registered" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ email });
  if (!user) return res.status(400).json({ message: "Invalid email" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  res.json({ token });
};
