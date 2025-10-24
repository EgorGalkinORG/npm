import { Router } from "express";
import PostController from "./post.controller";

const router = Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getById);
router.post("/", PostController.create);
router.patch("/:id", PostController.update);
router.delete("/:id", PostController.delete);

export default router;
