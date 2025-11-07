import prisma from "../generated/prisma";
import { TagRepositoryContract, Tag } from "./tag.types";

const TagRepository: TagRepositoryContract = {
  async getAll(skip?: number, take?: number): Promise<Tag[]> {
    return await prisma.tag.findMany({ skip, take });
  },

  async getById(id: number): Promise<Tag | null> {
    return await prisma.tag.findUnique({ where: { id } });
  },
};

export default TagRepository;
