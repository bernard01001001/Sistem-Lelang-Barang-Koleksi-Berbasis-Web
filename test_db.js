require('dotenv').config();
const { pool } = require('./config/db');

async function checkConnection() {
    try {
        console.log("Mencoba koneksi ke database dengan connection string dari .env...");
        const res = await pool.query('SELECT NOW()');
        console.log("✅ Koneksi database berhasil!");
        console.log("Waktu dari server database:", res.rows[0].now);
    } catch (err) {
        console.error("❌ Koneksi gagal:", err.message);
    } finally {
        pool.end();
    }
}

checkConnection();
