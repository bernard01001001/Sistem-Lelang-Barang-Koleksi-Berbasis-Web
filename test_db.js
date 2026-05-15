require('dotenv').config();
const db = require('./config/db');

async function test() {
  try {
    const result = await db.query(`
      SELECT b.*, 
             COALESCE((SELECT MAX(harga_penawaran) FROM tbl_lelang l WHERE l.id_barang = b.id_barang), b.harga_awal) as harga_tertinggi
      FROM tbl_barang b 
      WHERE b.status = 'approved' AND b.status_lelang != 'selesai'
    `);
    console.log("Success, count:", result.rowCount);
  } catch(e) {
    console.error("Query Error:", e.message);
  } finally {
    process.exit();
  }
}
test();
