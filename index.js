const express = require('express');
const app = express();

function getCurrentTimestamp() {
    return new Date().toISOString();
}

app.get('/timestamp', (req, res) => {
    res.json({ getCurrentTimestamp: getCurrentTimestamp() });
});

app.listen(5000, () => {
    console.log(`Сервер запущен на http://localhost:5000`);
});
