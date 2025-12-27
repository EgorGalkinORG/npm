import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.get('/posts', async (req, res) => {
  const Posts = [
    {
      id: 1,
      title: "Первый пост в FOROOMS",
      description: "Добро пожаловать в наше приложение на React и Node.js!",
      likes: 15,
      tags: [{ tag: { id: 1, name: "React" } }]
    },
    {
      id: 2,
      title: "Работа с TypeScript",
      description: "TS помогает избегать встреч с женским полом.",
      likes: 24,
      tags: [{ tag: { id: 2, name: "TypeScript" } }]
    }
  ];
  res.json(Posts);
});

app.get('/tags', async (req, res) => {
  const Tags = [
    { id: 1, name: "React" },
    { id: 2, name: "TypeScript" },
    { id: 3, name: "Backend" }
  ];
  res.json(Tags);
});

app.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const { include } = req.query;
  
  const includes = Array.isArray(include) ? include : [include];
  const post: any = { id: Number(postId), title: "Post", likes: 0, tags: [] };

  if (includes.includes('comments')) post.comments = [];
  if (includes.includes('likedBy')) post.likedBy = [];

  res.json(post);
});

app.post('/posts/:postId/comments', (req, res) => {
  const { body, userId } = req.body;
  const { postId } = req.params;
  
  const newComment = {
    id: Date.now(),
    body,
    createdAt: new Date().toISOString(),
    postId: Number(postId),
    authorId: userId
  };
  
  res.status(201).json(newComment);
});

app.put('/posts/:postId/likes/:userId', (req, res) => {
  res.status(201).json({ message: "Liked" });
});

app.delete('/posts/:postId/likes/:userId', (req, res) => {
  res.status(204).send();
});

app.listen(3001);
// сразу говорю что использовал ии для помощи в написании кода и работает как-то так себе