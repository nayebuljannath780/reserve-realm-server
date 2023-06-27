const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to server');
});

app.get('/test', (req, res) => {
    res.json('test okay');
});

app.listen(8080);