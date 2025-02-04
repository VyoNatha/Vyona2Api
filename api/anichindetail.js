const express = require('express');
const axios = require('axios'); // Pastikan axios terinstal
const router = express.Router();

router.get('/', async (req, res) => {
    const animeUrl = req.query.url; // Ambil URL anime dari query parameter

    if (!animeUrl) {
        return res.status(400).json({ status: false, creator: "Claire", message: "URL anime tidak diberikan." });
    }

    try {
        // Memanggil API eksternal
        const response = await axios.get(`https://api.siputzx.my.id/api/anime/anichin-detail?url=${encodeURIComponent(animeUrl)}`);
        
        // Mengganti creator menjadi "Claire"
        const result = {
            status: response.data.status,
            creator: "Claire", // Ganti creator
            data: {
                title: response.data.data.title,
                thumbnail: response.data.data.thumbnail,
                rating: response.data.data.rating,
                followers: response.data.data.followers,
                synopsis: response.data.data.synopsis,
                alternativeTitles: response.data.data.alternativeTitles,
                status: response.data.data.status,
                network: response.data.data.network,
                studio: response.data.data.studio,
                released: response.data.data.released,
                duration: response.data.data.duration,
                season: response.data.data.season,
                country: response.data.data.country,
                type: response.data.data.type,
                episodes: response.data.data.episodes,
                genres: response.data.data.genres
            }
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, creator: "Claire", message: "Terjadi kesalahan saat memanggil API eksternal." });
    }
});

module.exports = router;