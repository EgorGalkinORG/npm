import prisma from "./prisma";
import { CreatePostData, UpdatePostData, IPostService, Post } from "./post.types";

const PostService: IPostService = {
  async getAll() {
    return prisma.post.findMany({
      include: { tags: { include: { tag: true } } },
    });
  },

  async getById(id) {
    return prisma.post.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    });
  },

  async create(data) {
    const { title, description, image } = data;
    return prisma.post.create({
      data: { title, description, image },
    });
  },

  async update(id, data) {
    return prisma.post.update({
      where: { id },
      data,
    });
  },
};

export default PostService;
