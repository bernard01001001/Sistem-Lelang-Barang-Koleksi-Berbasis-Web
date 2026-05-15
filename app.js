const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Sistem-Lelang-Barang-Koleksi-Berbasis-Web';
const scriptPath = path.join(rootDir, 'assets', 'js', 'script.js');

let content = fs.readFileSync(scriptPath, 'utf8');

if (!content.includes('var BASE_URL =')) {
    content = 'var BASE_URL = window.location.pathname.includes(\'/pages/\') ? \'../\' : \'./\';\n\n' + content;
}

// Fix produkList gambar property
content = content.replace(/gambar: "images\/produk\//g, 'gambar: "assets/images/produk/');

// Fix dynamic HTML string in renderGridProduk, renderDetailProduk, renderCheckout
// We append BASE_URL to the image source
content = content.replace(/<img src="\' \+ p\.gambar/g, '<img src="\' + BASE_URL + p.gambar');
content = content.replace(/<img src="\' \+ produk\.gambar/g, '<img src="\' + BASE_URL + produk.gambar');

// Fix hrefs in string concatenation
content = content.replace(/href="produk\.html/g, 'href="\' + BASE_URL + \'pages/produk.html');
content = content.replace(/href="checkout\.html/g, 'href="\' + BASE_URL + \'pages/checkout.html');

// Replace template literals in Navbar
// Instead of complex regex, just replace the exact links
content = content.replace(/href="barang-saya\.html"/g, 'href="${BASE_URL}pages/barang-saya.html"');
content = content.replace(/href="jual\.html"/g, 'href="${BASE_URL}pages/jual.html"');
content = content.replace(/href="login\.html"/g, 'href="${BASE_URL}pages/login.html"');
content = content.replace(/href="daftar\.html"/g, 'href="${BASE_URL}pages/daftar.html"');
content = content.replace(/href="index\.html"/g, 'href="${BASE_URL}index.html"');
content = content.replace(/href="kategori\.html"/g, 'href="${BASE_URL}pages/kategori.html"');
content = content.replace(/href="lelang-aktif\.html"/g, 'href="${BASE_URL}pages/lelang-aktif.html"');
content = content.replace(/src="images\/logo\.png"/g, 'src="${BASE_URL}assets/images/logo.png"');

// Replace standard string inside renderBarangSaya
content = content.replace(/<a href="login\.html">/g, '<a href="\' + BASE_URL + \'pages/login.html">');
content = content.replace(/<a href="index\.html"/g, '<a href="\' + BASE_URL + \'index.html"');

// Fix window.location.href assignments
content = content.replace(/window\.location\.href = "index\.html"/g, 'window.location.href = BASE_URL + "index.html"');
content = content.replace(/window\.location\.href = "login\.html"/g, 'window.location.href = BASE_URL + "pages/login.html"');
content = content.replace(/window\.location\.href = "pembayaran\.html\?trx="/g, 'window.location.href = BASE_URL + "pages/pembayaran.html?trx="');
content = content.replace(/window\.location\.href = "akun-berhasil\.html"/g, 'window.location.href = BASE_URL + "pages/akun-berhasil.html"');

fs.writeFileSync(scriptPath, content);
console.log('script.js updated successfully');
