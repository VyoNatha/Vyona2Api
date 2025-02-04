const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint untuk mengambil data dari SnackVideo
router.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://archive-ui.tanakadomp.biz.id/search/font?q=roboto');

        // Mengambil data yang relevan dari respons API
        const data = response.data; // Asumsikan data yang diterima adalah objek

        // Mengubah format data sesuai dengan yang diinginkan
        const modifiedData = {
            status: true,
            creator: "Claire", // Ganti dengan nama Anda
            result: data.result.map(item => ({
                title: item.title,
                addedBy: item.addedBy,
                downloadLink: item.downloadLink,
                imageUrl: item.imageUrl
            }))
        };

        // Mengembalikan data yang telah dimodifikasi
        res.json(modifiedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data dari SnackVideo');
    }
});

module.exports = router;