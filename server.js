const express = require('express');
const path = require('path');

const app = express();

// Import router dari folder api
const randomanimeRouter = require('./api/randomanime');
const randomcosplayRouter = require('./api/randomcosplay');
const nekopoiRouter = require('./api/nekopoi');
const ai4chatRouter = require('./api/ai4chat');
const aianswerRouter = require('./api/aianswer');
const anichindetailRouter = require('./api/anichindetail');
const anichinsearchRouter = require('./api/anichinsearch');
const deepseekRouter = require('./api/deepseek');
const fontRouter = require('./api/font');
const lilychanaiRouter = require('./api/lilychanai');
const luminaiRouter = require('./api/luminai');
const lyricsRouter = require('./api/lyrics');
const soundcloudsRouter = require('./api/soundclouds');
const tiktokdlRouter = require('./api/tiktokdl');

// Middleware untuk parsing JSON
app.use(express.json());

// Gunakan router
app.use('/api/randomanime', randomanimeRouter);
app.use('/api/randomcosplay', randomcosplayRouter);
app.use('/api/nekopoi', nekopoiRouter);
app.use('/api/ai4chat', ai4chatRouter);
app.use('/api/aianswer', aianswerRouter);
app.use('/api/anichindetail', anichindetailRouter);
app.use('/api/anichinsearch', anichinsearchRouter);
app.use('/api/deepseek', deepseekRouter);
app.use('/api/font', fontRouter);
app.use('/api/lilychanai', lilychanaiRouter);
app.use('/api/luminai', luminaiRouter);
app.use('/api/lyrics', lyricsRouter);
app.use('/api/soundclouds', soundcloudsRouter);
app.use('/api/tiktokdl', tiktokdlRouter);

// Serve file statis dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint dasar
app.get('/', (req, res) => {
    res.send('Selamat datang di API saya!');
});

// Ekspor aplikasi untuk digunakan oleh Vercel
module.exports = app;
