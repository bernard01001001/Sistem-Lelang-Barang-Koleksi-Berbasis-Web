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

// --- TUTUP LELANG & TENTUKAN PEMENANG ---
router.post('/tutup-lelang/:id_barang', async (req, res) => {
    try {
        const { id_barang } = req.params;
        const pool = await getConnection();

        // Ambil penawar tertinggi dari tbl_lelang
        const winnerResult = await pool.request()
            .input('id_b', sql.Int, id_barang)
            .query(`SELECT TOP 1 id_penawar, harga_penawaran 
                    FROM tbl_lelang 
                    WHERE id_barang = @id_b 
                    ORDER BY harga_penawaran DESC`);

        if (winnerResult.recordset.length === 0) {
            return res.status(404).json({ message: "Tidak ada penawar untuk barang ini." });
        }

        const pemenang = winnerResult.recordset[0];

        // Update status barang menjadi 'Sold' dan catat pemenangnya
        await pool.request()
            .input('id_b', sql.Int, id_barang)
            .input('id_p', sql.Int, pemenang.id_penawar)
            .query(`UPDATE tbl_barang 
                    SET status_barang = 'Sold'
                    WHERE id_barang = @id_b`);

        res.json({ 
            message: "Lelang berhasil ditutup!", 
            pemenang: pemenang 
        });
    } catch (err) {
        res.status(500).send("Gagal menutup lelang: " + err.message);
    }
});

// --- DASHBOARD ADMIN (Ringkasan Sistem) ---
router.get('/dashboard-stats', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(`
            SELECT 
                (SELECT COUNT(*) FROM tbl_user) as total_user,
                (SELECT COUNT(*) FROM tbl_barang WHERE status_barang = 'Open') as lelang_aktif,
                (SELECT COUNT(*) FROM tbl_barang WHERE status_barang = 'Sold') as barang_terjual,
                (SELECT SUM(harga_sekarang) FROM tbl_barang WHERE status_barang = 'Sold') as total_omzet
        `);
        
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send("Gagal mengambil statistik: " + err.message);
    }
});

module.exports = router;