const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');

// SIGNUP
router.post('/signup', async (req, res) => {
    const { nama, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            "INSERT INTO tbl_user (nama, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [nama, email, hashedPassword, 'user']
        );
        res.status(201).json({ message: "User berhasil daftar", user: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await db.query("SELECT * FROM tbl_user WHERE email = $1", [email]);
        if (result.rows.length === 0) return res.status(404).json({ message: "User tidak ditemukan" });

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: "Password salah" });
        res.json({ message: "Login berhasil", user: { id: user.id_user, nama: user.nama } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;