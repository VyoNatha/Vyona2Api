const express = require('express');
const axios = require('axios'); // Pastikan axios terinstal
const router = express.Router();

router.get('/', async (req, res) => {
    const userInput = req.query.text || 'Halo'; // Ambil input dari query parameter, default 'Halo'

    try {
        // Memanggil API eksternal
        const response = await axios.get(`https://archive-ui.tanakadomp.biz.id/ai/deepseek?text=${encodeURIComponent(userInput)}`);
        
        // Mengganti creator menjadi "Claire"
        const result = {
            status: response.data.status,
            creator: "Claire", // Ganti creator
            result: response.data.result // Ambil hasil dari API eksternal
        };

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, creator: "Claire", message: "Terjadi kesalahan saat memanggil API eksternal." });
    }
});

module.exports = router;