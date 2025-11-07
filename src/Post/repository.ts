import { PostRepositoryContract, Post, PostWithTags, PostCreate, PostUpdate } from "./post.types";
import Client from "../generated/prisma";
import { Prisma } from "@prisma/client";

export const PostRepository: PostRepositoryContract = {
  async getAll(take?: number): Promise<PostWithTags[]> {
    return await Client.post.findMany({
      take,
      include: { tags: { include: { tag: true } } },
    });
  },

  async getById(id: number): Promise<PostWithTags | null> {
    try {
      return await Client.post.findUnique({
        where: { id },
        include: { tags: { include: { tag: true } } },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") return null;
      throw error;
    }
  },

  async create(data: PostCreate): Promise<Post> {
    return await Client.post.create({ data });
  },

  async update(id: number, data: PostUpdate): Promise<Post | null> {
    try {
      return await Client.post.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") return null;
      throw error;
    }
  },

  async delete(id: number): Promise<Post | null> {
    try {
      return await Client.post.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") return null;
      throw error;
    }
  },
};
