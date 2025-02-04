const express = require('express');
const axios = require('axios'); // Pastikan axios terinstal
const router = express.Router();

router.get('/', async (req, res) => {
    const userInput = req.query.text || 'halo'; // Ambil input dari query parameter, default 'halo'

    try {
        // Memanggil API eksternal
        const response = await axios.get(`https://restapi.yanzoffc.xyz/api/ai/ai4chat?text=${encodeURIComponent(userInput)}`);
        
        // Mengganti creator menjadi "Claire"
        const result = {
            status: response.data.status,
            creator: "Claire", // Ganti creator
            data: response.data.data
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, creator: "Claire", message: "Terjadi kesalahan saat memanggil API eksternal." });
    }
});

module.exports = router;