const https = require('https');

https.get('https://koleku1.netlify.app/barang', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const list = JSON.parse(data);
    const now = new Date();
    const active = list.filter(p => new Date(p.tanggal_mulai) <= now);
    console.log("Total Items:", list.length);
    console.log("Active Items (mulai <= now):", active.length);
    if(active.length > 0) {
        console.log("First active item start:", active[0].tanggal_mulai);
    }
  });
}).on('error', (err) => console.log('Error: ' + err.message));
