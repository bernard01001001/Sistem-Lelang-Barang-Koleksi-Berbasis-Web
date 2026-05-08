const express = require('express');
const app = express();

// Import Routes
const authRoutes = require('./routes/authRoutes');
const barangRoutes = require('./routes/barangRoutes');

app.use(express.json());

// Gunakan Routes
app.use('/auth', authRoutes);
app.use('/barang', barangRoutes);

// --- VERIFIKASI BARANG (Role: Admin) ---
app.put('/admin/verifikasi-barang/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();

        await pool.request()
            .input('id_b', sql.Int, id)
            .query("UPDATE tbl_barang SET status_barang = 'Open' WHERE id_barang = @id_b");

        res.json({ message: "Barang telah disetujui dan lelang dibuka!" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));