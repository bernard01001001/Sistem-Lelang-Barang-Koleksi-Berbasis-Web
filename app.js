require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const barangRoutes = require('./routes/barangRoutes');
const adminRoutes = require('./routes/adminRoutes');
const lelangRoutes = require('./routes/lelangRoutes');
const pembayaranRoutes = require('./routes/pembayaranRoutes');

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Route utama untuk meload index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Gunakan Routes
app.use('/auth', authRoutes);
app.use('/barang', barangRoutes);
app.use('/admin', adminRoutes);
app.use('/lelang', lelangRoutes);
app.use('/pembayaran', pembayaranRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server jalan di http://localhost:${PORT}`);
    });
}

// WAJIB UNTUK VERCEL: Export module app
module.exports = app;
