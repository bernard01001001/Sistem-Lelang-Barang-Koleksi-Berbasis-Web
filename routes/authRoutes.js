const express = require('express');
const router = express.Router();
const { sql, getConnection } = require('../config/db');

// --- LOGIN ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const pool = await getConnection(); 
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .query("SELECT * FROM tbl_user WHERE email = @email AND password = @password AND status_akun = 'Aktif'");

        if (result.recordset.length > 0) {
            res.json({ message: "Login Berhasil", user: result.recordset[0] });
        } else {
            res.status(401).json({ message: "Gagal Login" });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// --- SIGNUP ---
router.post('/signup', async (req, res) => {
    try {
        const { nama_lengkap, email, password, no_hp, alamat, role } = req.body;
        const pool = await getConnection(); 
        await pool.request()
            .input('nama', sql.VarChar, nama_lengkap)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
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

// --- UPDATE PROFILE ---
router.put('/update-profile/:id_user', async (req, res) => {
    try {
        const { id_user } = req.params;
        const { nama_lengkap, no_hp, alamat } = req.body;
        const pool = await getConnection();

        await pool.request()
            .input('id', sql.Int, id_user)
            .input('nama', sql.VarChar, nama_lengkap)
            .input('hp', sql.VarChar, no_hp)
            .input('alamat', sql.Text, alamat)
            .query(`UPDATE tbl_user 
                    SET nama_lengkap = @nama, no_hp = @hp, alamat = @alamat 
                    WHERE id_user = @id`);

        res.json({ message: "Profil berhasil diperbarui!" });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;