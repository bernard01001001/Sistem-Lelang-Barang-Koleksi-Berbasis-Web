const http = require('https');

http.get('https://koleku1.netlify.app/barang', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log("Status Code:", res.statusCode);
    console.log("Content-Type:", res.headers['content-type']);
    console.log("Data snippet:", data.substring(0, 200));
  });
}).on('error', (err) => console.log('Error: ' + err.message));
