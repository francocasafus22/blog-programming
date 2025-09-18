import type { Request, Response } from "express";
import Post, { IPost } from "../models/Post";

class PostController {
  static async create(req: Request, res: Response) {
    try {
      const post: IPost = new Post(req.body);

      post.author = req.user.id;

      await post.save();

      res.status(201).json({ message: "Post creado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  }
  static async getAllMyPosts(req: Request, res: Response) {
    try {
      const posts = await Post.find({ author: req.user._id }).sort({
        updatedAt: -1,
      });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al obtener los posts" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { postId } = req.params;

      const post: IPost | null = await Post.findById(postId);
      if (!post) {
        res.status(404).json({ error: "El post no existe" });
        return;
      }

      if (!post.author.equals(req.user._id)) {
        res.status(401).json({ error: "No tienes autorización" });
        return;
      }

      await post.deleteOne();

      res.json({ message: "Post eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al eliminar un post" });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { postId } = req.params;

      const post: IPost | null = await Post.findById(postId);

      if (!post) {
        res.status(404).json({ error: "No existe el Post" });
        return;
      }

      if (!post.author.equals(req.user._id)) {
        res.status(401).json({ error: "No tienes autorización" });
        return;
      }

      post.set(req.body);
      await post.save();

      res.json({ message: "Post modificado correctamente" });
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al actualizar el post" });
    }
  }
  static async getFeed(req: Request, res: Response) {
    try {
      const posts = await Post.find()
        .populate("author", "email username")
        .sort({ updatedAt: -1 })
        .lean();

      if (!posts) {
        res.status(404).json({ error: "No hay publicaciones" });
        return;
      }

      const postsWithLikes = posts.map((post) => {
        const likedByUser = post.likes.some((like) => req.user._id);
        const likesCount = post.likes.length;

        return {
          ...post,
          likedByUser,
          likesCount,
          likes: undefined,
        };
      });

      res.json(postsWithLikes);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al cargar los posts" });
    }
  }

  static async viewLikesDetails(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const post = await Post.findById(postId).populate("likes", "username");

      if (!post) {
        res.status(404).json({ error: "El post no existe" });
      }

      res.json(post.likes);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al cargar los likes" });
    }
  }

  static async likePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const post: IPost | null = await Post.findById(postId);
      if (!post) {
        res.status(404).json({ message: "El post no existe" });
        return;
      }

      post.likes.some((id) => id.equals(req.user._id))
        ? await Post.updateOne(
            { _id: postId },
            { $pull: { likes: req.user._id } }
          )
        : await Post.updateOne(
            { _id: postId },
            { $addToSet: { likes: req.user._id } }
          );

      res.status(201).json({ message: "Like actualizado" });
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al dar like al post" });
    }
  }
}

export default PostController;
