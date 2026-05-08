const express = require('express');
const { sql, getConnection } = require('./config/db'); 
const app = express();

app.use(express.json());

// --- LOGIN ---
app.post('/login', async (req, res) => {
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
        console.error(err);
        res.status(500).send("Error pada server: " + err.message);
    }
});

// --- SIGNUP ---
app.post('/signup', async (req, res) => {
    try {
        const { nama_lengkap, email, password, no_hp, alamat, role } = req.body;
        
        const pool = await getConnection(); 

        // Cek email terdaftar
        const checkUser = await pool.request()
            .input('email', sql.VarChar, email)
            .query("SELECT * FROM tbl_user WHERE email = @email");

        if (checkUser.recordset.length > 0) {
            return res.status(400).json({ message: "Email sudah digunakan!" });
        }
        
        //Insert user baru
        await pool.request()
            .input('nama', sql.VarChar, nama_lengkap)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, password)
            .input('no_hp', sql.VarChar, no_hp)
            .input('alamat', sql.Text, alamat)
            .input('role', sql.VarChar, role)
            .query(`INSERT INTO tbl_user (nama_lengkap, email, password, no_hp, alamat, role, status_akun) 
                    VALUES (@nama, @email, @password, @no_hp, @alamat, @role, 'Aktif')`);

        res.status(201).json({ message: "Registrasi Berhasil! Silakan Login." });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error Server: " + err.message);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));