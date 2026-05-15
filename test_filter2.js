const https = require('https');

https.get('https://koleku1.netlify.app/barang', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const list = JSON.parse(data);
    const now = new Date();
    console.log("NOW:", now.toISOString());
    console.log("Total:", list.length);
    let count = 0;
    for(let p of list) {
       const start = new Date(p.tanggal_mulai);
       if (start <= now) {
          count++;
          console.log(`Active: ID ${p.id_barang}, Start: ${start.toISOString()}`);
       }
    }
    console.log("Count:", count);
  });
});
