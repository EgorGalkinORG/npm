import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export type Tag = Prisma.TagGetPayload<{}>;

export type TagCreate = Prisma.TagUncheckedCreateInput;
export type TagUpdate = Prisma.TagUncheckedUpdateInput;

export interface TagServiceContract {
  getAll: (skip?: number, take?: number) => Promise<Tag[]>;
  getById: (id: number) => Promise<Tag | null>;
}

export interface TagRepositoryContract {
  getAll: (skip?: number, take?: number) => Promise<Tag[]>;
  getById: (id: number) => Promise<Tag | null>;
}

export interface TagControllerContract {
  getAll: (req: Request<object, Tag[] | string, object, { skip?: string; take?: string }>, res: Response<Tag[] | string>) => Promise<void>;
  getById: (req: Request<{ id: string }, Tag | string, object>, res: Response<Tag | string>) => Promise<void>;
}
