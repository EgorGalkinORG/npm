import { promises as fs } from "fs";

const FILE_PATH = "./src/posts.json";

export interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
}

const PostService = {
  async getAll(): Promise<Post[]> {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const posts: Post[] = JSON.parse(data);
    return posts;
  },

  async getById(id: number): Promise<Post | undefined> {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    const posts: Post[] = JSON.parse(data);
    return posts.find((p) => p.id === id);
  },

  async create(postData: Omit<Post, "id">) {
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
};

export default PostService;
