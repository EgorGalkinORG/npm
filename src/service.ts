import { promises as fs } from "fs";
import { Post, CreatePostData, UpdatePostData } from "./post.types";

const FILE_PATH = "./src/posts.json";

const PostService = {
  async getAll(): Promise<Post[]> {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data) as Post[];
  },

  async getById(id: number): Promise<Post | undefined> {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const posts: Post[] = JSON.parse(data);
    return posts.find((p) => p.id === id);
  },

  async create(postData: CreatePostData) {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const posts: Post[] = JSON.parse(data);

    const newPost: Post = {
      id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
      ...postData,
    };

    posts.push(newPost);
    await fs.writeFile(FILE_PATH, JSON.stringify(posts, null, 2));

    return newPost;
  },

  async update(id: number, updateData: UpdatePostData) {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const posts: Post[] = JSON.parse(data);
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      throw new Error("Пост не найден");
    }

    posts[index] = { ...posts[index], ...updateData };

    await fs.writeFile(FILE_PATH, JSON.stringify(posts, null, 2));

    return posts[index];
  },
};

export default PostService;
