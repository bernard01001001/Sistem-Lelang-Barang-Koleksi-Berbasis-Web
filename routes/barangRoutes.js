const express = require('express');
const router = express.Router();
const db = require('../config/db');

// TAMBAH BARANG
router.post('/', async (req, res) => {
    const { nama_barang, harga_awal, deskripsi, id_user, gambar, durasi_jam } = req.body;
    try {
        const durasi = parseInt(durasi_jam) || 24;
        const result = await db.query(
            "INSERT INTO tbl_barang (nama_barang, harga_awal, deskripsi, id_user, status, gambar, tanggal_selesai, status_lelang) VALUES ($1, $2, $3, $4, $5, $6, NOW() + INTERVAL '1 hour' * $7, 'berjalan') RETURNING *",
            [nama_barang, harga_awal, deskripsi, id_user, 'approved', gambar || '', durasi]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LIHAT SEMUA BARANG (Tampilan Publik)
router.get('/', async (req, res) => {
    try {
        // Gabungkan dengan harga tertinggi dari lelang

        const result = await db.query(`
            SELECT b.*, 
                   COALESCE((SELECT MAX(harga_penawaran) FROM tbl_lelang l WHERE l.id_barang = b.id_barang), b.harga_awal) as harga_tertinggi
            FROM tbl_barang b 
            WHERE b.status = 'approved' AND b.status_lelang != 'selesai'
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET BARANG DETAIL
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT b.*, 
                   COALESCE((SELECT MAX(harga_penawaran) FROM tbl_lelang l WHERE l.id_barang = b.id_barang), b.harga_awal) as harga_tertinggi
            FROM tbl_barang b 
            WHERE b.id_barang = $1
        `, [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;