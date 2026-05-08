const express = require('express');
const app = express();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const barangRoutes = require('./routes/barangRoutes');

app.use(express.json());

// Gunakan Routes
app.use('/auth', authRoutes);     // URL akan jadi: /auth/login & /auth/signup
app.use('/barang', barangRoutes); // URL akan jadi: /barang/ & /barang/bid

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));