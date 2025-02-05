const express = require('express');
const path = require('path');
const app = express();

// Import router dari folder api
const randomanimeRouter = require('./api/randomanime');
const randomcosplayRouter = require('./api/randomcosplay');
const nekopoiRouter = require('./api/nekopoi');

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan router
app.use('/api/randomanime', randomanimeRouter);
app.use('/api/randomcosplay', randomcosplayRouter);
app.use('/api/nekopoi', nekopoiRouter);

// Serve file statis dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
