const express = require('express');
const allApiRouter = require('./api/allapi'); // Pastikan jalur ini benar

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan router
app.use('/api', allApiRouter); // Pastikan ini sesuai dengan rute yang Anda inginkan

// Endpoint dasar
app.get('/', (req, res) => {
    res.send('Selamat datang di API saya!');
});

// Ekspor aplikasi untuk digunakan oleh Vercel
module.exports = app;
