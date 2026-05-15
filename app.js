require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const barangRoutes = require('./routes/barangRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Gunakan Routes
app.use('/auth', authRoutes);
app.use('/barang', barangRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});