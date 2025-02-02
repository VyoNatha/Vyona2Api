const axios = require('axios');

const creatorName = "Claire404"; // Ganti "Nama Anda" dengan nama yang diinginkan

module.exports = async (req, res) => {
    const username = req.query.user; // Ambil parameter username dari URL

    if (!username) {
        return res.status(400).json({ status: false, message: "Parameter 'user' tidak boleh kosong." });
    }

    try {
        // Lakukan permintaan ke API eksternal
        const response = await axios.get(`https://api-ghost-x.web.id/api/tools/tiktokstalk`, {
            params: { user: username }
        });

        // Periksa apakah ada hasil
        if (response.data && response.data.status) {
            const data = response.data.result;

            // Struktur respons yang diinginkan
            const formattedResponse = {
                status: true,
                creator: creatorName,
                result: {
                    nama: data.nama || "N/A",
                    user: data.user || "N/A",
                    bio: data.bio || "N/A",
                    privatemode: data.privatemode || false,
                    profile: data.profile || "",
                    followers: data.followers || 0,
                    following: data.following || 0
                }
            };

            res.json(formattedResponse);
        } else {
            res.json({
                status: false,
                message: "Pengguna tidak ditemukan."
            });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "Terjadi kesalahan saat menghubungi API." });
    }
};