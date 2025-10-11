const express = require("express");
const router = express.Router();
const PostController = require("./post.controller");

router.get("/", PostController.getAll);
router.get("/:id", PostController.getById);
router.post("/", PostController.create);

module.exports = router;