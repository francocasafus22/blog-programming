import type { Request, Response } from "express";
import User, { IUser } from "../models/User";
import slug from "slug";
import { checkPassword, hashPassword } from "../utils/bcrypt";
import { generateJWT } from "../utils/jwt";

class AuthController {
  static async createAccount(req: Request, res: Response) {
    try {
      const user: IUser = new User(req.body);

      const userExist = await User.findOne({ email: user.email });

      if (userExist) {
        res.status(403).json({ error: "Ya existe un usuario con ese email" });
        return;
      }

      user.username = slug(user.username, "");

      const usernameExist = await User.findOne({ username: user.username });
      if (usernameExist) {
        res.status(403).json({ error: "Ya existe un usuario con ese user" });
        return;
      }

      user.password = await hashPassword(user.password);
      await user.save();
      res.status(201).json({ message: "Usuario creado" });
    } catch (e) {
      const error = new Error("Hubo un error");
      res.status(500).json({ error: error.message });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const existUser: IUser = await User.findOne({ email });
      if (!existUser) {
        res
          .status(404)
          .json({ error: "No hay una cuenta registrada con ese mail" });
        return;
      }

      const isPasswordCorrect = await checkPassword(
        password,
        existUser.password
      );

      if (!isPasswordCorrect) {
        res.status(401).json({ error: "Contraseña incorrecta" });
        return;
      }

      const token = generateJWT(existUser._id.toString());

      res.json(token);
    } catch (e) {
      const error = new Error("Hubo un error");
      res.status(500).json({ error: error.message });
    }
  }
}

export default AuthController;
