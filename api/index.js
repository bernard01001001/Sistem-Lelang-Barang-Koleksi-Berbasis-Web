require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Import Routes
const authRoutes = require('../routes/authRoutes');
const barangRoutes = require('../routes/barangRoutes');
const adminRoutes = require('../routes/adminRoutes');
const lelangRoutes = require('../routes/lelangRoutes');
const pembayaranRoutes = require('../routes/pembayaranRoutes');

// API Routes
app.use('/auth', authRoutes);
app.use('/barang', barangRoutes);
app.use('/admin', adminRoutes);
app.use('/lelang', lelangRoutes);
app.use('/pembayaran', pembayaranRoutes);

// Export for Vercel serverless
module.exports = app;
