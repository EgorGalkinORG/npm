import { PostServiceContract, Post, PostWithTags, PostCreate, PostUpdate } from "./post.types";
import { PostRepository } from "./repository";

export const PostService: PostServiceContract = {
  getAll(take?: number): Promise<PostWithTags[]> {
    return PostRepository.getAll(take);
  },

  getById(id: number): Promise<PostWithTags | null> {
    return PostRepository.getById(id);
  },

  create(data: PostCreate): Promise<Post> {
    return PostRepository.create(data);
  },

  update(id: number, data: PostUpdate): Promise<Post | null> {
    return PostRepository.update(id, data);
  },

  delete(id: number): Promise<Post | null> {
    return PostRepository.delete(id);
  },
};
