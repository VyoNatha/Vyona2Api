const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint untuk mengambil data dari SoundCloud
router.get('/', async (req, res) => {
    const query = req.query.q; // Mengambil parameter query dari URL

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const response = await axios.get(`https://archive-ui.tanakadomp.biz.id/search/soundcloud?q=${query}`);

        // Mengambil data yang relevan dari respons API
        const data = response.data;

        // Memeriksa apakah ada hasil
        if (data && data.result) {
            // Mengubah format data sesuai dengan yang diinginkan
            const modifiedData = {
                status: true,
                creator: "Claire", // Ganti dengan nama Anda
                result: data.result.map(item => ({
                    title: item.title,
                    url: item.url, // Pastikan ini sesuai dengan struktur data yang diterima
                    // Anda bisa menambahkan properti lain jika ada
                }))
            };

            // Mengembalikan data yang telah dimodifikasi
            res.json(modifiedData);
        } else {
            return res.status(404).json({ status: false, message: 'No results found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'An error occurred while fetching data' });
    }
});

module.exports = router;