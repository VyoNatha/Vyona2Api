const express = require('express');
const path = require('path');

const app = express();

// Import router yang telah digabungkan
const combinedRouter = require('./allapi');

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan router
app.use('/api', combinedRouter); // Menggunakan satu router untuk semua endpoint

// Serve file statis dari folder public
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint dasar
app.get('/', (req, res) => {
    res.send('Selamat datang di API saya!');
});

// Ekspor aplikasi untuk digunakan oleh Vercel
module.exports = app;
