import prisma from "../generated/prisma";
import { IPostService, CreatePostChecked, UpdatePostChecked } from "./post.types";

const PostService: IPostService = {
  async getAll() {
    try {
      return await prisma.post.findMany({
        include: { tags: { include: { tag: true } } },
      });
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      return await prisma.post.findUnique({
        where: { id },
        include: { tags: { include: { tag: true } } },
      });
    } catch (error) {
      throw error;
    }
  },

  async create(data: CreatePostChecked) {
    try {
      return await prisma.post.create({ data });
    } catch (error) {
      throw error;
    }
  },

  async update(id: number, data: UpdatePostChecked) {
    try {
      return await prisma.post.update({ where: { id }, data });
    } catch (error) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      return await prisma.post.delete({ where: { id } });
    } catch (error: any) {
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  },
};

export default PostService;
