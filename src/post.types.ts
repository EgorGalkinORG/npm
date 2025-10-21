import { Request, Response } from "express";

export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
}

export type CreatePostData = Omit<Post, "id">;
export type UpdatePostData = Partial<Omit<Post, "id">>;

export interface IPostService {
  getAll(): Promise<Post[]>;
  getById(id: number): Promise<Post | undefined>;
  create(data: CreatePostData): Promise<Post>;
  update(id: number, data: UpdatePostData): Promise<Post>;
}

export interface IPostController {
  getAll(req: Request, res: Response): Promise<void>;
  getById(req: Request, res: Response): Promise<void>;
  create(req: Request<{}, {}, CreatePostData>, res: Response): Promise<void>;
  update(req: Request<{ id: string }, {}, UpdatePostData>, res: Response): Promise<void>;
}
