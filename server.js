const express = require('express');
const path = require('path');
const nekopoiRouter = require('./routes/nekopoi');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/nekopoi', nekopoiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
