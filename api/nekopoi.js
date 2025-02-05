const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ status: true, message: 'Nekopoi API' });
});

module.exports = router; // Pastikan ini ada
