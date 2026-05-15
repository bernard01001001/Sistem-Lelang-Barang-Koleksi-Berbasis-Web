const express = require('express');
const router = express.Router();
const { sql, getConnection } = require('../config/db');

// --- CREATE TRANSACTION ---
router.post('/create', async (req, res) => {
    try {
        const { id_user, id_barang, total, metode, status, virtual_account, batas_waktu } = req.body;
        const pool = await getConnection();

        const result = await pool.request()
            .input('id_user', sql.Int, id_user)
            .input('id_barang', sql.Int, id_barang)
            .input('total', sql.Decimal(18, 2), total)
            .input('metode', sql.VarChar, metode)
            .input('status', sql.VarChar, status || 'Menunggu Pembayaran')
            .input('virtual_account', sql.VarChar, virtual_account || null)
            .input('batas_waktu', sql.DateTime, batas_waktu ? new Date(batas_waktu) : null)
            .query(`INSERT INTO tbl_pembayaran 
                    (id_user, id_barang, total, metode, status, virtual_account, batas_waktu, created_at) 
                    OUTPUT INSERTED.id_pembayaran
                    VALUES (@id_user, @id_barang, @total, @metode, @status, @virtual_account, @batas_waktu, GETDATE())`);

        res.status(201).json({ 
            message: "Transaksi berhasil dibuat!", 
            id_pembayaran: result.recordset[0].id_pembayaran 
        });
    } catch (err) {
        res.status(500).send("Gagal membuat transaksi: " + err.message);
    }
});

// --- GET TRANSACTION DETAILS ---
router.get('/:trx', async (req, res) => {
    try {
        const { trx } = req.params;
        const pool = await getConnection();

        const result = await pool.request()
            .input('trx', sql.Int, trx)
            .query("SELECT * FROM tbl_pembayaran WHERE id_pembayaran = @trx");

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// --- CONFIRM PAYMENT ---
router.put('/confirm/:trx', async (req, res) => {
    try {
        const { trx } = req.params;
        const pool = await getConnection();

        await pool.request()
            .input('trx', sql.Int, trx)
            .query("UPDATE tbl_pembayaran SET status = 'Lunas', paid_at = GETDATE() WHERE id_pembayaran = @trx");

        res.json({ message: "Pembayaran dikonfirmasi!" });
    } catch (err) {
        res.status(500).send("Gagal konfirmasi: " + err.message);
    }
});

// --- GET USER TRANSACTIONS ---
router.get('/user/:id_user', async (req, res) => {
    try {
        const { id_user } = req.params;
        const pool = await getConnection();

        const result = await pool.request()
            .input('id_user', sql.Int, id_user)
            .query("SELECT p.*, b.nama_barang FROM tbl_pembayaran p LEFT JOIN tbl_barang b ON p.id_barang = b.id_barang WHERE p.id_user = @id_user ORDER BY p.created_at DESC");

        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
