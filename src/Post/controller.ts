import { IPostController } from "./post.types";
import PostService from "./service";

const PostController: IPostController = {
  async getAll(req, res) {
    const posts = await PostService.getAll();
    res.json(posts);
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    const post = await PostService.getById(id);
    if (!post) {
      res.status(404).json({ message: "Пост не найден" });
      return;
    }
    res.json(post);
  },

  async create(req, res) {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      res.status(400).json({ message: "Заполните все поля" });
      return;
    }
    const newPost = await PostService.create({ title, description, image });
    res.status(201).json(newPost);
  },

  async update(req, res) {
    const id = Number(req.params.id);
    const data = req.body;
    try {
      const updatedPost = await PostService.update(id, data);
      res.json(updatedPost);
    } catch {
      res.status(404).json({ message: "Пост не найден" });
    }
  },

  async delete(req, res) {
    const id = Number(req.params.id);
    try {
      const deletedPost = await PostService.delete(id);
      if (!deletedPost) {
        res.status(404).json({ message: "Пост не найден" });
        return;
      }
      res.json(deletedPost);
    } catch {
      res.status(500).json({ message: "Ошибка при удалении поста" });
    }
  },
};

export default PostController;
