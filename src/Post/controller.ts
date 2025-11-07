import { Request, Response } from "express";
import { PostControllerContract } from "./post.types";
import { PostService } from "./service";

export const PostController: PostControllerContract = {
  getAll: async (req, res) => {
    const take = req.query.take ? Number(req.query.take) : undefined;
    if (take && isNaN(take)) {
      res.status(400).json("take must be a number");
      return;
    }
    const posts = await PostService.getAll(take);
    res.status(200).json(posts);
  },

  getById: async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json("id must be a number");
      return;
    }
    const post = await PostService.getById(id);
    if (!post) {
      res.status(404).json("Post not found");
      return;
    }
    res.status(200).json(post);
  },

  create: async (req, res) => {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      res.status(422).json("All fields are required");
      return;
    }
    const post = await PostService.create({ title, description, image });
    res.status(201).json(post);
  },

  update: async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json("id must be a number");
      return;
    }
    const post = await PostService.update(id, req.body);
    if (!post) {
      res.status(404).json("Post not found");
      return;
    }
    res.status(200).json(post);
  },

  delete: async (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json("id must be a number");
      return;
    }
    const post = await PostService.delete(id);
    if (!post) {
      res.status(404).json("Post not found");
      return;
    }
    res.status(200).json(post);
  },
};
