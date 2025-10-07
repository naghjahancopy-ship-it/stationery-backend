import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ error: "Unauthorized" });
  const token = auth.split(" ")[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = payload;
    next();
  }catch(e){
    return res.status(401).json({ error: "Invalid token" });
  }
};