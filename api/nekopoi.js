const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint untuk mengambil data dari Nekopoi
router.get('/', async (req, res) => {
    try {
        // Mengambil data dari API eksternal
        const response = await axios.get('https://archive-ui.tanakadomp.biz.id/asupan/nekopoi');

        // Mengubah nama creator menjadi nama Anda
        const modifiedData = {
            status: response.data.status,
            creator: "Claire", // Ganti dengan nama Anda dalam tanda kutip
            result: response.data.result
        };

        // Mengembalikan data yang telah dimodifikasi
        res.json(modifiedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data dari Nekopoi');
    }
});

module.exports = router;
