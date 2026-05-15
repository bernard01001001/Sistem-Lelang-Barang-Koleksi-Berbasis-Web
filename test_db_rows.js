require('dotenv').config();
const db = require('./config/db');

async function test() {
  try {
    const result = await db.query(`SELECT id_barang, nama_barang, tanggal_mulai, status_lelang FROM tbl_barang ORDER BY id_barang`);
    console.table(result.rows);
  } catch(e) {
    console.error("Query Error:", e.message);
  } finally {
    process.exit();
  }
}
test();
