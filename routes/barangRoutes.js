const express = require('express');
const router = express.Router();
const db = require('../config/db');

// TAMBAH BARANG
router.post('/', async (req, res) => {
    const { nama_barang, harga_awal, deskripsi, id_user } = req.body;
    try {
        const result = await db.query(
            "INSERT INTO tbl_barang (nama_barang, harga_awal, deskripsi, id_user, status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nama_barang, harga_awal, deskripsi, id_user, 'pending']
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LIHAT SEMUA BARANG (Tampilan Publik)
router.get('/', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM tbl_barang WHERE status = 'approved'");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;