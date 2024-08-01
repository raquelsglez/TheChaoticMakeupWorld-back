const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
const postRoutes = require('./routes/users/postRoutes');
const authRoutes = require('./routes/users/authRoutes');
const userRoutes = require('./routes/users/userRoutes');
const adminPostRoutes = require('./routes/admin/postRoutes');
const adminAuthRoutes = require('./routes/admin/authRoutes');

const app = express();

app.use(cors()); //cors -> para permitir solicitudes desde el front
app.use(bodyParser.json()); //bodyParser -> analiza cuerpos de solicutds json

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/me', userRoutes);
app.use('/api/admin/posts', adminPostRoutes);
app.use('/api/admin/auth', adminAuthRoutes);


app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
});