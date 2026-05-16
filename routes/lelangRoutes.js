const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/bid', async (req, res) => {
    const { id_barang, id_user, harga_penawaran } = req.body;

    try {
        // 1. Cek peran user
        const userCheck = await db.query("SELECT role FROM tbl_user WHERE id_user = $1", [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }
        if (userCheck.rows[0].role === 'pelelang') {
            return res.status(403).json({ message: "Pelelang tidak diizinkan untuk menawar barang." });
        }

        // 2. Ambil data barang (Cukup satu kali query untuk semua info)
        const barangResult = await db.query(
            "SELECT status_lelang, harga_awal, tanggal_selesai FROM tbl_barang WHERE id_barang = $1", 
            [id_barang]
        );

        if (barangResult.rows.length === 0) {
            return res.status(404).json({ message: "Barang tidak ditemukan." });
        }

        const { status_lelang, harga_awal, tanggal_selesai } = barangResult.rows[0];

        // 2. CEK DURASI: Apakah waktu sudah habis?
        const sekarang = new Date();
        if (tanggal_selesai && sekarang > new Date(tanggal_selesai)) {
            // Jika sudah lewat, update status di DB dan tolak bid
            await db.query("UPDATE tbl_barang SET status_lelang = 'selesai' WHERE id_barang = $1", [id_barang]);
            return res.status(400).json({ message: "Waktu lelang sudah habis!" });
        }

        // 3. Cek apakah admin sudah menutup lelang secara manual
        if (status_lelang === 'selesai') {
            return res.status(400).json({ message: "Maaf, lelang untuk barang ini sudah ditutup." });
        }

        // 4. Cek Bid Tertinggi saat ini
        const maxBidCheck = await db.query(
            "SELECT id_user, harga_penawaran FROM tbl_lelang WHERE id_barang = $1 ORDER BY harga_penawaran DESC LIMIT 1",
            [id_barang]
        );

        let currentMax = harga_awal;
        let lastBidderId = null;

        if (maxBidCheck.rows.length > 0) {
            currentMax = maxBidCheck.rows[0].harga_penawaran;
            lastBidderId = maxBidCheck.rows[0].id_user;
        }

        // Cek apakah user yang sama mencoba menawar berturut-turut
        if (lastBidderId == id_user) {
            return res.status(400).json({ message: "Anda adalah penawar tertinggi saat ini. Tunggu orang lain menawar lebih dulu." });
        }

        // 5. Validasi: Harga baru harus lebih tinggi dari penawaran tertinggi
        if (harga_penawaran <= currentMax) {
            return res.status(400).json({ 
                message: `Tawaran harus lebih tinggi dari harga saat ini (Min: ${currentMax + 1})` 
            });
        }

        // 6. Eksekusi simpan bid baru
        const result = await db.query(
            "INSERT INTO tbl_lelang (id_barang, id_user, harga_penawaran) VALUES ($1, $2, $3) RETURNING *",
            [id_barang, id_user, harga_penawaran]
        );

        res.status(201).json({
            message: "Berhasil mengirim tawaran",
            data: result.rows[0]
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LIHAT BARANG YANG SAYA MENANGKAN
router.get('/my-wins/:userId', async (req, res) => {
    try {
        // Query ini mencocokkan id_user dengan id_pemenang yang ada di tbl_barang
        const result = await db.query(
            `SELECT b.id_barang, b.nama_barang, b.harga_awal, l.harga_penawaran AS harga_final 
             FROM tbl_barang b 
             JOIN tbl_lelang l ON b.id_barang = l.id_barang 
             WHERE b.id_pemenang = $1 
             AND b.status_lelang = 'selesai' 
             AND l.harga_penawaran = (SELECT MAX(harga_penawaran) FROM tbl_lelang WHERE id_barang = b.id_barang)`,
            [req.params.userId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// RIWAYAT BID (BID HISTORY)
router.get('/history/:id_barang', async (req, res) => {
    try {
        const result = await db.query(
            "SELECT id_user, harga_penawaran, created_at FROM tbl_lelang WHERE id_barang = $1 ORDER BY harga_penawaran DESC",
            [req.params.id_barang]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;