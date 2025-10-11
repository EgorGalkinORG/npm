const PostService = require("./post.service");

const PostController = {
    async getAll(req, res) {
        try {
            const posts = await PostService.getAll();
            res.json(posts);
        } catch (err) {
            res.status(500).json({ error: "Ошибка при чтении постов" });
        }
    },

    async getById(req, res) {
        try {
            const id = +req.params.id;
            if (isNaN(id)) {
                return res.status(400).json({ error: "id должен быть числом" });
            }

            const post = await PostService.getById(id);
            if (!post) {
                return res.status(404).json({ error: "Пост не найден" });
            }

            res.json(post);
        } catch (err) {
            res.status(500).json({ error: "Ошибка при получении поста" });
        }
    },

    async create(req, res) {
        try {
            const { title, description, image } = req.body;

            if (!title || !description || !image) {
                return res.status(422).json({ error: "title, description и image обязательны" });
            }

            const newPost = await PostService.create({ title, description, image });
            res.status(201).json(newPost);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Ошибка при создании поста" });
        }
    },
};

module.exports = PostController;
