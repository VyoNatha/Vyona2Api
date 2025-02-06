const express = require('express');
const axios = require('axios');
const router = express.Router();

// Endpoint untuk mengambil data dari Nekopoi
router.get('/nekopoi', async (req, res) => {
    try {
        const response = await axios.get('https://archive-ui.tanakadomp.biz.id/asupan/nekopoi');
        const modifiedData = {
            status: response.data.status,
            creator: "Claire",
            result: response.data.result
        };
        res.json(modifiedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data dari Nekopoi');
    }
});

// Endpoint untuk mengambil data dari SnackVideo
router.get('/snackvideo', async (req, res) => {
    try {
        const response = await axios.get('https://archive-ui.tanakadomp.biz.id/search/snackvideo?q=jj');
        const data = response.data;
        const modifiedData = {
            status: true,
            creator: "Claire",
            result: {
                title: data.result.title,
                like: data.result.like,
                comments: data.result.comments,
                share: data.result.share,
                URL: data.result.URL
            }
        };
        res.json(modifiedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data dari SnackVideo');
    }
});

// Endpoint untuk mengambil data lirik
router.get('/lyrics', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    try {
        const response = await axios.get(`https://archive-ui.tanakadomp.biz.id/search/lirik?q=${query}`);
        const data = response.data;
        if (data && data.result) {
            const result = data.result;
            const modifiedData = {
                status: true,
                creator: "Claire",
                result: {
                    title: result.title,
                    album: result.album,
                    thumb: result.thumb,
                    lyrics: result.lyrics
                }
            };
            res.json(modifiedData);
        } else {
            return res.status(404).json({ status: false, message: 'No results found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'An error occurred while fetching data' });
    }
});

// Tambahkan endpoint lainnya di sini dengan cara yang sama...

// Endpoint untuk mengambil data dari SoundCloud
router.get('/soundcloud', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    try {
        const response = await axios.get(`https://archive-ui.tanakadomp.biz.id/search/soundcloud?q=${query}`);
        const data = response.data;
        if (data && data.result) {
            const modifiedData = {
                status: true,
                creator: "Claire",
                result: data.result.map(item => ({
                    title: item.title,
                    url: item.url,
                }))
            };
            res.json(modifiedData);
        } else {
            return res.status(404).json({ status: false, message: 'No results found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, error: 'An error occurred while fetching data' });
    }
});

// Tambahkan endpoint lainnya sesuai kebutuhan...

module.exports = router;
