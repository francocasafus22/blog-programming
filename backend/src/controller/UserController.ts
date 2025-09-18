import type { Request, Response } from "express";
import User, { IUser } from "../models/User";
import Post from "../models/Post";

class UserController {
  static async getProfile(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).select("-password -__v");
      const userPosts = await Post.find({ author: userId })
        .sort({ createdAt: -1 })
        .lean();

      if (!user) {
        res.status(404).json({ error: "No existe el usuario" });
        return;
      }

      const posts = userPosts.map(({ likes, ...rest }) => ({
        ...rest,
        likesCount: likes.length,
      }));

      res.json({ user, posts });
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al obtener el usuario" });
    }
  }

  
}

export default UserController;
