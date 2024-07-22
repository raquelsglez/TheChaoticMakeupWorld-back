const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
const postRoutes = require('./routes/users/postRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/posts', postRoutes);


app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});