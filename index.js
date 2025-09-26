const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

function getCurrentTimestamp() {
    return new Date().toISOString();
}

app.get('/timestamp', (req, res) => {
    res.json({ getCurrentTimestamp: getCurrentTimestamp() });
});

app.get('/posts', (req, res) => {
    const dataPath = path.join(__dirname, 'posts.json');
    let posts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    let skipNum = 0;
    let takeNum = posts.length;

    if (req.query.skip !== undefined) {
        skipNum = Number(req.query.skip);
    }

    if (req.query.take !== undefined) {
        takeNum = Number(req.query.take);
    }

    posts = posts.slice(skipNum, skipNum + takeNum);

    res.json(posts);
    
});

app.get('/posts/:id', (req, res) => {
    const dataPath = path.join(__dirname, 'posts.json');
    let posts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const id = +req.params.id;

    // решил с помощью post =>
    const post = posts.find(post => id === id);

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
});

app.listen(5000, () => {
    console.log(`Сервер запущен на http://localhost:5000`);
});
