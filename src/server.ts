import express from "express";
import { router } from "./Post/router";

const app = express();

app.use(express.json());
app.use("/posts", router);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});
