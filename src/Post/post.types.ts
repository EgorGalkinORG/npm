import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export type Post = Prisma.PostGetPayload<{}>;
export type PostWithTags = Prisma.PostGetPayload<{ include: { tags: { include: { tag: true } } } }>;
export type PostCreate = Prisma.PostUncheckedCreateInput;
export type PostUpdate = Prisma.PostUncheckedUpdateInput;

export interface PostRepositoryContract {
  getAll: (take?: number) => Promise<PostWithTags[]>;
  getById: (id: number) => Promise<PostWithTags | null>;
  create: (data: PostCreate) => Promise<Post>;
  update: (id: number, data: PostUpdate) => Promise<Post | null>;
  delete: (id: number) => Promise<Post | null>;
}

export interface PostServiceContract {
  getAll: (take?: number) => Promise<PostWithTags[]>;
  getById: (id: number) => Promise<PostWithTags | null>;
  create: (data: PostCreate) => Promise<Post>;
  update: (id: number, data: PostUpdate) => Promise<Post | null>;
  delete: (id: number) => Promise<Post | null>;
}

export interface PostControllerContract {
  getAll: (req: Request<object, PostWithTags[] | string, object, { take?: string }>, res: Response<PostWithTags[] | string>) => Promise<void>;
  getById: (req: Request<{ id: string }, PostWithTags | string, object>, res: Response<PostWithTags | string>) => Promise<void>;
  create: (req: Request<object, Post | string, PostCreate, object>, res: Response<Post | string>) => Promise<void>;
  update: (req: Request<{ id: string }, Post | string, PostUpdate, object>, res: Response<Post | string>) => Promise<void>;
  delete: (req: Request<{ id: string }, Post | string, object>, res: Response<Post | string>) => Promise<void>;
}
