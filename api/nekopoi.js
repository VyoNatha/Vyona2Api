// api/neko.js
const axios = require('axios');

export default async function handler(req, res) {
    try {
        // Mengambil data dari API eksternal
        const response = await axios.get('https://archive-ui.tanakadomp.biz.id/asupan/nekopoi');

        // Mengubah nama creator menjadi nama Anda
        const modifiedData = {
            status: response.data.status,
            creator: "Claire", // Ganti dengan nama Anda
            result: response.data.result
        };

        // Mengembalikan data yang telah dimodifikasi
        res.status(200).json(modifiedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengambil data dari Nekopoi');
    }
}
