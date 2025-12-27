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
  res.json([]); 
});

app.get('/tags', async (req, res) => {
  res.json([]);
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