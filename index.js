const express = require('express');
const nekopoiRouter = require('./api/nekopoi'); // Mengimpor router dari nekopoi.js

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Menggunakan router untuk endpoint /api/nekopoi
app.use('/api/nekopoi', nekopoiRouter);

// Endpoint dasar
app.get('/', (req, res) => {
    res.send('Selamat datang di API saya!');
});

// Ekspor aplikasi untuk digunakan oleh Vercel
module.exports = app;
