const express = require('express');
const router = express.Router();
const { sql, getConnection } = require('../config/db');

// --- VERIFIKASI BARANG (Admin) ---
router.put('/verifikasi-barang/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();

        await pool.request()
            .input('id_b', sql.Int, id)
            .query("UPDATE tbl_barang SET status_barang = 'Open' WHERE id_barang = @id_b");

        res.json({ message: "Barang telah disetujui dan lelang dibuka!" });
    } catch (err) {
        res.status(500).send("Gagal verifikasi: " + err.message);
    }
});

// --- LIHAT SEMUA USER (Admin) ---
router.get('/users', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query("SELECT id_user, nama_lengkap, email, role, status_akun FROM tbl_user");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;