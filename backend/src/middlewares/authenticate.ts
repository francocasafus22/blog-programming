import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utils/jwt";
import User, { IUser } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    const token = bearer.split(" ")[1];

    const decoded = verifyJWT(token);

    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res.status(404).json({ error: "El usuario no existe" });
        return;
      }
      req.user = user;
      next();
    } else {
      res.status(401).json({ error: "Token no válido" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: "Token no válido" });
    return;
  }
};
