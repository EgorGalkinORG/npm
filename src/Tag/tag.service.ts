import { TagServiceContract, Tag } from "./tag.types";
import TagRepository from "./tag.repository";

const TagService: TagServiceContract = {
  async getAll(skip?: number, take?: number): Promise<Tag[]> {
    return await TagRepository.getAll(skip, take);
  },

  async getById(id: number): Promise<Tag | null> {
    return await TagRepository.getById(id);
  },
};

export default TagService;
