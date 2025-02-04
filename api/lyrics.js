const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint untuk mengambil data lirik
router.get('/', async (req, res) => {
    const query = req.query.q; // Mengambil parameter query dari URL

    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    try {
        const response = await axios.get(`https://archive-ui.tanakadomp.biz.id/search/lirik?q=${query}`);

        // Mengambil data yang relevan dari respons API
        const data = response.data;

        // Memeriksa apakah ada hasil
        if (data && data.result) {
            const result = data.result;

            // Mengubah format data sesuai dengan yang diinginkan
            const modifiedData = {
                status: true,
                creator: "Claire",
                result: {
                    title: result.title,
                    album: result.album,
                    thumb: result.thumb,
                    lyrics: result.lyrics // Pastikan ini sesuai dengan struktur data yang diterima
                }
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