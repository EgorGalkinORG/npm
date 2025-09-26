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
    res.json(
        JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    );
});

app.listen(5000, () => {
    console.log(`Сервер запущен на http://localhost:5000`);
});
