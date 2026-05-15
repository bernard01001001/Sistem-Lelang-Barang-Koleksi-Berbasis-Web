const express = require('express');
const router = express.Router();
const db = require('../config/db');

// LIHAT SEMUA BARANG PENDING (Hanya Admin)
router.get('/pending', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM tbl_barang WHERE status = $1", ['pending']);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// APPROVE BARANG
router.put('/approve/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("UPDATE tbl_barang SET status = 'approved' WHERE id_barang = $1", [id]);
        res.json({ message: "Barang telah disetujui untuk dilelang" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;