import { Request, Response } from "express";
import { Post as PrismaPost, Prisma } from "@prisma/client";

export type Post = PrismaPost;

export type PostWithTags = Prisma.PostGetPayload<{
  include: { tags: { include: { tag: true } } };
}>;

export type CreatePost = Pick<Post, "title" | "description" | "image">;
export type CreatePostChecked = Required<CreatePost>;

export type UpdatePost = Partial<CreatePost>;
export type UpdatePostChecked = Required<UpdatePost>;

export interface IPostService {
  getAll(): Promise<PostWithTags[]>;
  getById(id: number): Promise<PostWithTags | null>;
  create(data: CreatePostChecked): Promise<Post>;
  update(id: number, data: UpdatePostChecked): Promise<Post>;
  delete(id: number): Promise<Post | null>;
}

export interface IPostController {
  getAll(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  create(req: Request<any, any, any>, res: Response): Promise<void>;
  update(req: Request<any, any, any>, res: Response): Promise<void>;
  delete(req: Request, res: Response): Promise<void>;
}
