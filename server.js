const express = require('express');
const path = require('path');
const app = express();
const nekopoiRouter = require('./routes/nekopoi');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Use API routes
app.use('/api', nekopoiRouter);

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
