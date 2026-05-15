require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
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
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});
