const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const { sql, getConnection } = require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const barangRoutes = require('./routes/barangRoutes');
const adminRoutes = require('./routes/adminRoutes')
const pembayaranRoutes = require('./routes/pembayaranRoutes');

app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Gunakan Routes
app.use('/auth', authRoutes);
app.use('/barang', barangRoutes);
app.use('/admin', adminRoutes);
app.use('/pembayaran', pembayaranRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));