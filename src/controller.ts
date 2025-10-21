import { Request, Response } from "express";
import PostService from "./service";
import { IPostController, UpdatePostData, CreatePostData } from "./post.types";

const PostController: IPostController = {
  async getAll(req: Request, res: Response) {
    try {
      const posts = await PostService.getAll();
      res.json(posts);
    } catch {
      res.status(500).json({ error: "Ошибка при чтении постов" });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = +req.params.id;
      if (isNaN(id)) {
        return res.status(400).json({ error: "id должен быть числом" });
      }

      const post = await PostService.getById(id);
      if (!post) {
        return res.status(404).json({ error: "Пост не найден" });
      }

      res.json(post);
    } catch {
      res.status(500).json({ error: "Ошибка при получении поста" });
    }
  },

  async create(req: Request<{}, {}, CreatePostData>, res: Response) {
    try {
      const { title, description, image } = req.body;

      if (!title || !description || !image) {
        return res.status(422).json({ error: "title, description и image обязательны" });
      }

      if (
        typeof title !== "string" ||
        typeof description !== "string" ||
        typeof image !== "string"
      ) {
        return res.status(400).json({ error: "Неверный тип данных" });
      }

      const newPost = await PostService.create({ title, description, image });
      res.status(201).json(newPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Ошибка при создании поста" });
    }
  },

  async update(req: Request<{ id: string }, {}, UpdatePostData>, res: Response) {
    try {
      const id = +req.params.id;
      if (isNaN(id)) {
        return res.status(400).json({ error: "id должен быть числом" });
      }

      const { title, description, image } = req.body;

      if (title && typeof title !== "string") {
        return res.status(400).json({ error: "title должен быть строкой" });
      }
      if (description && typeof description !== "string") {
        return res.status(400).json({ error: "description должен быть строкой" });
      }
      if (image && typeof image !== "string") {
        return res.status(400).json({ error: "image должен быть строкой" });
      }

      const updatedPost = await PostService.update(id, { title, description, image });
      res.json(updatedPost);
    } catch (err: any) {
      if (err.message === "Пост не найден") {
        return res.status(404).json({ error: err.message });
      }
      res.status(500).json({ error: "Ошибка при обновлении поста" });
    }
  },
};

export default PostController;
