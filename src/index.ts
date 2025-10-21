import express from "express";
import postRouter from "./router";

const app = express();

app.use(express.json());
app.use("/posts", postRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});
