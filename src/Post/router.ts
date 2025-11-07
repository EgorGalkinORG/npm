import express from 'express';
import { PostController } from './controller';

const router: express.Router = express.Router();

router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getById);
router.post("/create", PostController.create);
router.patch("/posts/update/:id", PostController.update);
router.delete("/posts/delete/:id", PostController.delete);

export { router };
