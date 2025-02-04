const express = require('express');
const axios = require('axios'); // Pastikan axios terinstal
const router = express.Router();

router.get('/', async (req, res) => {
    const query = req.query.query; // Ambil query dari parameter

    if (!query) {
        return res.status(400).json({ status: false, creator: "Claire", message: "Query tidak diberikan." });
    }

    try {
        // Memanggil API eksternal
        const response = await axios.get(`https://api.siputzx.my.id/api/anime/anichin-search?query=${encodeURIComponent(query)}`);
        
        // Mengganti creator menjadi "Claire"
        const result = {
            status: response.data.status,
            creator: "Claire", // Ganti creator
            data: response.data.data.map(anime => ({
                title: anime.title,
                type: anime.type,
                status: anime.status,
                link: anime.link,
                image: anime.image
            }))
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, creator: "Claire", message: "Terjadi kesalahan saat memanggil API eksternal." });
    }
});

module.exports = router;