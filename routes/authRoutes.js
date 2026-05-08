const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Tambahkan ini
const { sql, getConnection } = require('../config/db');

// --- SIGNUP DENGAN HASHING ---
router.post('/signup', async (req, res) => {
    try {
        const { nama_lengkap, email, password, no_hp, alamat, role } = req.body;
        const pool = await getConnection(); 

        // 1. Hash password (10 adalah salt rounds)
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.request()
            .input('nama', sql.VarChar, nama_lengkap)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, hashedPassword) // Simpan yang sudah di-hash
            .input('no_hp', sql.VarChar, no_hp)
            .input('alamat', sql.Text, alamat)
            .input('role', sql.VarChar, role)
            .query(`INSERT INTO tbl_user (nama_lengkap, email, password, no_hp, alamat, role, status_akun) 
                    VALUES (@nama, @email, @password, @no_hp, @alamat, @role, 'Aktif')`);

        res.status(201).json({ message: "Registrasi Berhasil!" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// --- LOGIN DENGAN PENGECEKAN HASH ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const pool = await getConnection(); 
        
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query("SELECT * FROM tbl_user WHERE email = @email AND status_akun = 'Aktif'");

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            
            // 2. Bandingkan password input dengan hash di DB
            const isMatch = await bcrypt.compare(password, user.password);
            
            if (isMatch) {
                // Hapus password dari object sebelum dikirim ke client agar aman
                delete user.password;
                res.json({ message: "Login Berhasil", user });
            } else {
                res.status(401).json({ message: "Password salah!" });
            }
        } else {
            res.status(401).json({ message: "Email tidak ditemukan!" });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;