const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint untuk mengambil data dari SnackVideo
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://archive-ui.tanakadomp.biz.id/search/snackvideo?q=jj');

        // Mengambil data yang relevan dari respons API
        const data = response.data; // Asumsikan data yang diterima adalah objek

        // Mengubah format data sesuai dengan yang diinginkan
        const modifiedData = {
            status: true,
            creator: "Claire", // Nama creator yang diinginkan
            result: {
                title: data.result.title, // Mengambil judul dari data
                like: data.result.like, // Mengambil jumlah like
                comments: data.result.comments, // Mengambil jumlah komentar
                share: data.result.share, // Mengambil jumlah share
                URL: data.result.URL // Mengambil URL video
            }
        };

        // Mengembalikan data yang telah dimodifikasi
        res.json(modifiedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data dari SnackVideo');
    }
});

module.exports = router;