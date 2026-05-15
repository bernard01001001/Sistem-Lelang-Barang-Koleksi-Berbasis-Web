require('dotenv').config();
const { Pool } = require('pg');

// Menggunakan connection string dari .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Wajib untuk koneksi aman ke Neon
  }
});

// Fungsi untuk eksekusi query agar mirip cara pakainya dengan sebelumnya
const query = (text, params) => pool.query(text, params);

module.exports = { query, pool };