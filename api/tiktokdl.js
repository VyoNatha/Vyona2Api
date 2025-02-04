const express = require('express');
const axios = require('axios'); // Pastikan axios terinstal
const router = express.Router();

router.get('/', async (req, res) => {
    const videoUrl = req.query.url; // Ambil URL video dari query parameter

    if (!videoUrl) {
        return res.status(400).json({ status: 400, creator: "Claire", message: "URL video TikTok tidak diberikan." });
    }

    try {
        // Memanggil API eksternal
        const response = await axios.get(`https://restapi.yanzoffc.xyz/api/dl/tiktok?url=${encodeURIComponent(videoUrl)}`);
        
        // Mengganti creator menjadi "Claire"
        const result = {
            status: response.data.status,
            creator: "Claire", // Ganti creator
            data: {
                title: response.data.data.title,
                cover: response.data.data.cover,
                origin_cover: response.data.data.origin_cover,
                no_watermark: response.data.data.no_watermark,
                watermark: response.data.data.watermark,
                music: response.data.data.music
            }
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, creator: "Claire", message: "Terjadi kesalahan saat memanggil API eksternal." });
    }
});

module.exports = router;