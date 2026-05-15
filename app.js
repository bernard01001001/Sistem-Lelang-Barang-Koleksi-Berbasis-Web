require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// 1. Beri tahu Express untuk melayani file statis (CSS, JS, Gambar) di folder root
app.use(express.static(path.join(__dirname, '.')));

// 2. Beri tahu Express apa yang harus dikirim saat user buka halaman utama "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Baris module.exports harus tetap di paling bawah
module.exports = app;
const app = express();

app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const barangRoutes = require('./routes/barangRoutes');
const adminRoutes = require('./routes/adminRoutes');
const lelangRoutes = require('./routes/lelangRoutes');
const pembayaranRoutes = require('./routes/pembayaranRoutes');


// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

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
