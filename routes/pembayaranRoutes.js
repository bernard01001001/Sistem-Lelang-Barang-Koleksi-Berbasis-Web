const express = require('express');
const router = express.Router();
const { query } = require('../config/db');

// --- CREATE TRANSACTION ---
router.post('/create', async (req, res) => {
    try {
        const { id_user, id_barang, total, metode, status, virtual_account, batas_waktu } = req.body;
        
        // 1. Cek peran user
        const userCheck = await query("SELECT role FROM tbl_user WHERE id_user = $1", [id_user]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ message: "User tidak ditemukan." });
        }
        if (userCheck.rows[0].role === 'pelelang') {
            return res.status(403).json({ message: "Pelelang tidak diizinkan untuk membeli barang." });
        }

        const q = `INSERT INTO tbl_pembayaran 
                   (id_user, id_barang, total, metode, status, virtual_account, batas_waktu, created_at) 
                   VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) 
                   RETURNING id_pembayaran`;
        
        const values = [
            id_user, 
            id_barang, 
            total, 
            metode, 
            status || 'Menunggu Pembayaran', 
            virtual_account || null, 
            batas_waktu ? new Date(batas_waktu) : null
        ];
        
        const result = await query(q, values);

        res.status(201).json({ 
            message: "Transaksi berhasil dibuat!", 
            id_pembayaran: result.rows[0].id_pembayaran 
        });
    } catch (err) {
        res.status(500).send("Gagal membuat transaksi: " + err.message);
    }
});

// --- GET TRANSACTION DETAILS ---
router.get('/:trx', async (req, res) => {
    try {
        const { trx } = req.params;
        
        const result = await query("SELECT * FROM tbl_pembayaran WHERE id_pembayaran = $1", [trx]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// --- CONFIRM PAYMENT ---
router.put('/confirm/:trx', async (req, res) => {
    try {
        const { trx } = req.params;
        
        await query("UPDATE tbl_pembayaran SET status = 'Lunas', paid_at = NOW() WHERE id_pembayaran = $1", [trx]);

        res.json({ message: "Pembayaran dikonfirmasi!" });
    } catch (err) {
        res.status(500).send("Gagal konfirmasi: " + err.message);
    }
});

// --- GET USER TRANSACTIONS ---
router.get('/user/:id_user', async (req, res) => {
    try {
        const { id_user } = req.params;
        
        const result = await query("SELECT p.*, b.nama_barang FROM tbl_pembayaran p LEFT JOIN tbl_barang b ON p.id_barang = b.id_barang WHERE p.id_user = $1 ORDER BY p.created_at DESC", [id_user]);

        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
