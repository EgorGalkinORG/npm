import express from "express";
import PostController from "./controller";

const router = express.Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getById);
router.post("/", PostController.create);
router.patch("/:id", PostController.update);

export default router;
