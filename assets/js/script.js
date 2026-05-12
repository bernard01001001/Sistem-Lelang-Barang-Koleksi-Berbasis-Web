function renderNavbar() {
  var user = localStorage.getItem("koleku_user");
  var menuKanan = "";

  if (user) {
    menuKanan = `
      <span style="font-weight:bold;color:#3f2e1e">Halo, ${user}</span>
      <a href="barang-saya.html">Barang Saya</a>
      <a href="#" onclick="logout()">Keluar</a>
      <a href="jual.html" class="btn">Jual Barang</a>
    `;
  } else {
    menuKanan = `
      <a href="login.html">Masuk</a>
      <a href="daftar.html">Daftar</a>
      <a href="jual.html" class="btn">Jual Barang</a>
    `;
  }

  var html = `
    <nav class="navbar">
      <a href="index.html" class="logo">
        <img src="images/logo.png" alt="KOLEKU">
      </a>
      <form class="search" onsubmit="cariProduk(event)">
        <input type="text" id="search-input" placeholder="Cari Barang berdasarkan kata kunci">
        <button type="submit">🔎</button>
      </form>
      <div class="menu">${menuKanan}</div>
    </nav>

    <div class="subnav">
      <a href="index.html">Beranda</a>
      <a href="kategori.html">Kategori</a>
      <a href="lelang-aktif.html">Lelang Aktif</a>
    </div>
  `;

  var nav = document.getElementById("navbar");
  if (nav) nav.innerHTML = html;
}
function renderFooter() {
  var html =
    '<footer class="footer">' +
    '<p>&copy; 2025 KOLEKU - Platform Lelang Online</p>' +
    '<div style="margin-top:8px">' +
    '<a href="#">Tentang</a>' +
    '<a href="#">Kontak</a>' +
    '<a href="#">Syarat & Ketentuan</a>' +
    '<a href="#">Bantuan</a>' +
    '</div>' +
    '</footer>';

  var f = document.getElementById("footer");
  if (f) f.innerHTML = html;
}

function logout() {
  localStorage.removeItem("koleku_user");
  window.location.href = "index.html";
}

function cariProduk(e) {
  e.preventDefault();
  var keyword = document.getElementById("search-input").value;
  alert("Mencari: " + keyword);
}

// Daftar produk dummy lengkap
var produkList = [
  {
    id: 1,
    nama: "Lukisan Dinding Klasik Italia",
    deskripsi: "Lukisan dinding klasik bergaya Italia dengan bingkai artistik, koleksi tahun 1950.",
    hargaAwal: 2000000,
    hargaTertinggi: 2500000,
    kategori: "Antik & Seni",
    sisaWaktu: "2 hari 5 jam",
    gambar: "images/produk/classical-italian-framed-painting-on-wall.jpg",
  },
  {
    id: 2,
    nama: "Guci Keramik Bunga Eropa",
    deskripsi: "Guci keramik dengan motif bunga khas Eropa, kondisi sangat terawat.",
    hargaAwal: 3000000,
    hargaTertinggi: 3700000,
    kategori: "Antik & Seni",
    sisaWaktu: "1 jam 30 menit",
    gambar: "images/produk/european-ceramic-flower-vase-antique.jpg",
  },
  {
    id: 3,
    nama: "Jam Tangan Analog Wanita",
    deskripsi: "Jam tangan analog mewah untuk wanita, warna emas klasik.",
    hargaAwal: 700000,
    hargaTertinggi: 850000,
    kategori: "Aksesoris",
    sisaWaktu: "1 hari 3 jam",
    gambar: "images/produk/elegant-women-analog-wristwatch-gold.jpg",
  },
  {
    id: 4,
    nama: "Tote Bag Gucci Wanita",
    deskripsi: "Tas tote Gucci original, kondisi 95% seperti baru.",
    hargaAwal: 12000000,
    hargaTertinggi: 15700000,
    kategori: "Aksesoris",
    sisaWaktu: "2 jam 10 menit",
    gambar: "images/produk/luxury-brown-leather-gucci-tote-bag.jpg",
  },
  {
    id: 5,
    nama: "Lampu Meja Antik Tiffany",
    deskripsi: "Lampu meja gaya Tiffany dengan kaca patri warna-warni yang indah.",
    hargaAwal: 500000,
    hargaTertinggi: 670000,
    kategori: "Kerajinan",
    sisaWaktu: "45 menit",
    gambar: "images/produk/tiffany-stained-glass-tulip-table-lamp.jpg",
  },
  {
    id: 6,
    nama: "Vas Keramik Bunga Asia",
    deskripsi: "Vas keramik dekoratif dengan sentuhan seni Asia Timur.",
    hargaAwal: 400000,
    hargaTertinggi: 500000,
    kategori: "Kerajinan",
    sisaWaktu: "3 jam",
    gambar: "images/produk/decorative-ceramic-pitcher-vintage.jpg",
  },
  {
    id: 7,
    nama: "Lampu Kamar Kuning Kain",
    deskripsi: "Lampu tidur dengan kap kain memberikan suasana hangat di kamar.",
    hargaAwal: 600000,
    hargaTertinggi: 750000,
    kategori: "Dekorasi",
    sisaWaktu: "1 hari",
    gambar: "images/produk/yellow-fabric-shade-table-lamp.jpg",
  },
  {
    id: 8,
    nama: "Flatshoes Hijau Gucci",
    deskripsi: "Sepatu flat Gucci warna hijau mewah, koleksi terbatas.",
    hargaAwal: 1500000,
    hargaTertinggi: 1800000,
    kategori: "Fashion",
    sisaWaktu: "2 jam 10 menit",
    gambar: "images/produk/green-gucci-flat-shoes-luxury.jpg",
  },
  {
    id: 9,
    nama: "Radio Vintage Merah",
    deskripsi: "Radio antik warna merah menyala, masih berfungsi menangkap gelombang AM/FM.",
    hargaAwal: 500000,
    hargaTertinggi: 700000,
    kategori: "Antik & Seni",
    sisaWaktu: "45 menit",
    gambar: "images/produk/red-vintage-retro-radio.jpg",
  },
  {
    id: 10,
    nama: "Gitar Listrik Klasik Hijau",
    deskripsi: "Gitar listrik vintage warna hijau dengan suara yang sangat khas.",
    hargaAwal: 2000000,
    hargaTertinggi: 2700000,
    kategori: "Antik & Seni",
    sisaWaktu: "1 jam 5 menit",
    gambar: "images/produk/green-classic-electric-guitar.jpg",
  },
  {
    id: 11,
    nama: "Kamera Antik",
    deskripsi: "Kamera analog vintage dengan case kulit asli.",
    hargaAwal: 500000,
    hargaTertinggi: 700000,
    kategori: "Kamera",
    sisaWaktu: "5 jam",
    gambar: "images/produk/vintage-fujifilm-digital-camera-with-leather-case.jpg",
  },
  {
    id: 12,
    nama: "Koin Kuno",
    deskripsi: "Koin koleksi dari masa perjuangan tahun 1945.",
    hargaAwal: 300000,
    hargaTertinggi: 450000,
    kategori: "Antik & Seni",
    sisaWaktu: "1 hari",
    gambar: "images/produk/round-vintage-sunglasses.jpg",
  },
  {
    id: 13,
    nama: "Patung Kayu",
    deskripsi: "Patung ukiran tangan dari kayu jati berkualitas tinggi.",
    hargaAwal: 1200000,
    hargaTertinggi: 1400000,
    kategori: "Antik & Seni",
    sisaWaktu: "2 hari",
    gambar: "images/produk/tiffany-stained-glass-tulip-table-lamp.jpg",
  },
];
console.log("KOLEKU: script.js v2 loaded. Total produk:", produkList.length);

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function renderGridProduk() {
  var grid = document.getElementById("grid-produk");
  if (!grid) return;

  var html = "";
  for (var i = 0; i < produkList.length; i++) {
    var p = produkList[i];
    html +=
      '<a href="produk.html?id=' + p.id + '" onclick="localStorage.setItem(\'koleku_last_viewed_id\', ' + p.id + ')">' +
      '<div class="card">' +
      '<img src="' + p.gambar + '" alt="' + p.nama + '" style="width:100%; height:160px; object-fit:cover;">' +
      '<div class="body">' +
      '<div class="title">' + p.nama + '</div>' +
      '<div class="price">' + formatRupiah(p.hargaTertinggi) + '</div>' +
      '<div class="meta">Sisa: ' + p.sisaWaktu + '</div>' +
      '</div>' +
      '</div>' +
      '</a>';
  }
  grid.innerHTML = html;
}

function renderDetailProduk() {
  var detail = document.getElementById("detail-produk");
  if (!detail) return;

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get("id")) || 1;

  var produk = null;
  for (var i = 0; i < produkList.length; i++) {
    if (produkList[i].id === id) {
      produk = produkList[i];
      break;
    }
  }
  if (!produk) {
    detail.innerHTML = "<p>Produk tidak ditemukan.</p>";
    return;
  }

  var html =
    '<div class="img-box"><img src="' + produk.gambar + '" alt="' + produk.nama + '" style="width:100%; border-radius:8px;"></div>' +
    '<div>' +
    '<h1>' + produk.nama + '</h1>' +
    '<p class="info"><span>Kategori:</span> ' + produk.kategori + '</p>' +
    '<p class="info"><span>Deskripsi:</span> ' + produk.deskripsi + '</p>' +
    '<div class="harga-box">' +
    '<div class="label">Harga Awal</div>' +
    '<div class="value" style="font-size:16px">' + formatRupiah(produk.hargaAwal) + '</div>' +
    '</div>' +
    '<div class="harga-box">' +
    '<div class="label">Harga Tertinggi Saat Ini</div>' +
    '<div class="value">' + formatRupiah(produk.hargaTertinggi) + '</div>' +
    '</div>' +
    '<div class="timer">Sisa Waktu: ' + produk.sisaWaktu + '</div>' +
    '<form class="bid-form" onsubmit="kirimBid(event,' + produk.id + ')">' +
    '<input type="number" id="bid-input" placeholder="Tawaran Anda (min ' + (produk.hargaTertinggi + 50000) + ')" required>' +
    '<button class="btn" type="submit">Tawar</button>' +
    '</form>' +
    '<a href="checkout.html?id=' + produk.id + '" class="btn btn-block">Beli Sekarang</a>' +
    '</div>';

  detail.innerHTML = html;
}

function kirimBid(e, id) {
  e.preventDefault();
  var user = localStorage.getItem("koleku_user");
  if (!user) {
    alert("Silakan login dulu untuk menawar.");
    window.location.href = "login.html";
    return;
  }
  var nilai = parseInt(document.getElementById("bid-input").value);
  if (!nilai || nilai <= 0) {
    alert("Masukkan tawaran yang benar.");
    return;
  }
  alert("Tawaran sebesar " + formatRupiah(nilai) + " berhasil dikirim!");
  window.location.reload();
}

function renderCheckout() {
  var box = document.getElementById("checkout-content");
  if (!box) return;

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get("id")) || 1;

  var produk = null;
  for (var i = 0; i < produkList.length; i++) {
    if (produkList[i].id === id) {
      produk = produkList[i];
      break;
    }
  }
  if (!produk) produk = produkList[0];

  var ongkir = 25000;
  var total = produk.hargaTertinggi + ongkir;

  var html =
    '<div>' +
    '<div class="checkout-box">' +
    '<h3>Barang yang Dibeli</h3>' +
    '<div style="display:flex;gap:12px;align-items:center">' +
    '<img src="' + produk.gambar + '" alt="' + produk.nama + '" style="width:80px;height:80px;object-fit:cover;border-radius:6px;">' +
    '<div>' +
    '<div style="font-weight:bold">' + produk.nama + '</div>' +
    '<div style="color:#1f6f3a;font-weight:bold">' + formatRupiah(produk.hargaTertinggi) + '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="checkout-box">' +
    '<h3>Alamat Pengiriman</h3>' +
    '<div class="form-group">' +
    '<label>Nama Penerima</label>' +
    '<input type="text" placeholder="Nama lengkap">' +
    '</div>' +
    '<div class="form-group">' +
    '<label>Nomor HP</label>' +
    '<input type="text" placeholder="08xxxxxxxxx">' +
    '</div>' +
    '<div class="form-group">' +
    '<label>Alamat</label>' +
    '<textarea rows="3" placeholder="Jl. ..."></textarea>' +
    '</div>' +
    '<div class="form-row">' +
    '<div class="form-group"><label>Kota</label><input type="text"></div>' +
    '<div class="form-group"><label>Kode Pos</label><input type="text"></div>' +
    '</div>' +
    '</div>' +
    '<div class="checkout-box">' +
    '<h3>Metode Pembayaran</h3>' +
    '<div class="form-group">' +
    '<label><input type="radio" name="bayar" checked> PayPal</label>' +
    '</div>' +
    '<div class="form-group">' +
    '<label><input type="radio" name="bayar"> Transfer Bank</label>' +
    '</div>' +
    '<div class="form-group">' +
    '<label><input type="radio" name="bayar"> Kartu Kredit</label>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div>' +
    '<div class="summary">' +
    '<h3>Ringkasan Pesanan</h3>' +
    '<div class="row"><span>Harga Barang</span><span>' + formatRupiah(produk.hargaTertinggi) + '</span></div>' +
    '<div class="row"><span>Ongkos Kirim</span><span>' + formatRupiah(ongkir) + '</span></div>' +
    '<div class="row total"><span>Total</span><span>' + formatRupiah(total) + '</span></div>' +
    '<button class="btn btn-block" style="margin-top:12px" onclick="bayar()">Bayar Sekarang</button>' +
    '</div>' +
    '</div>';

  box.innerHTML = html;
}

function bayar() {
  var user = localStorage.getItem("koleku_user");
  if (!user) {
    alert("Silakan login dulu.");
    window.location.href = "login.html";
    return;
  }

  // ambil id produk dari url checkout
  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get("id")) || 1;

  var produk = null;
  for (var i = 0; i < produkList.length; i++) {
    if (produkList[i].id === id) {
      produk = produkList[i];
      break;
    }
  }
  if (!produk) produk = produkList[0];

  // simpan ke daftar pembelian user
  var key = "koleku_pembelian_" + user;
  var pembelian = JSON.parse(localStorage.getItem(key) || "[]");

  var noTransaksi = "KLK-" + Date.now();
  var tanggal = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  pembelian.push({
    noTransaksi: noTransaksi,
    tanggal: tanggal,
    produkId: produk.id,
    namaProduk: produk.nama,
    harga: produk.hargaTertinggi,
    ongkir: 25000,
    total: produk.hargaTertinggi + 25000,
    status: "Lunas",
    metode: "PayPal",
  });
  localStorage.setItem(key, JSON.stringify(pembelian));

  window.location.href = "pembayaran.html?trx=" + noTransaksi;
}

function renderPembayaran() {
  var box = document.getElementById("pembayaran-detail");
  if (!box) return;

  var user = localStorage.getItem("koleku_user");
  if (!user) {
    box.innerHTML = "<p>Silakan login dulu.</p>";
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var trx = params.get("trx");

  var key = "koleku_pembelian_" + user;
  var pembelian = JSON.parse(localStorage.getItem(key) || "[]");

  var data = null;
  for (var i = 0; i < pembelian.length; i++) {
    if (pembelian[i].noTransaksi === trx) {
      data = pembelian[i];
      break;
    }
  }
  // kalau tidak ada transaksi spesifik, ambil yang terakhir
  if (!data && pembelian.length > 0) {
    data = pembelian[pembelian.length - 1];
  }
  if (!data) {
    box.innerHTML = "<p>Belum ada transaksi.</p>";
    return;
  }

  var html =
    '<div style="display:flex;justify-content:space-between;margin-bottom:6px">' +
    '<span>Barang:</span><b>' + data.namaProduk + '</b>' +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;margin-bottom:6px">' +
    '<span>Total Bayar:</span><b>' + formatRupiah(data.total) + '</b>' +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;margin-bottom:6px">' +
    '<span>Metode Pembayaran:</span><b>' + data.metode + '</b>' +
    '</div>' +
    '<div style="display:flex;justify-content:space-between;margin-bottom:6px">' +
    '<span>Status:</span><b style="color:#1f6f3a">' + data.status + '</b>' +
    '</div>' +
    '<div style="display:flex;justify-content:space-between">' +
    '<span>No. Transaksi:</span><b>#' + data.noTransaksi + '</b>' +
    '</div>';

  box.innerHTML = html;
}

function renderBarangSaya() {
  var box = document.getElementById("barang-saya");
  if (!box) return;

  var user = localStorage.getItem("koleku_user");
  if (!user) {
    box.innerHTML =
      '<p style="text-align:center;padding:40px">' +
      'Anda belum login. <a href="login.html">Masuk dulu</a> untuk melihat barang yang sudah dibeli.' +
      '</p>';
    return;
  }

  var key = "koleku_pembelian_" + user;
  var pembelian = JSON.parse(localStorage.getItem(key) || "[]");

  if (pembelian.length === 0) {
    box.innerHTML =
      '<div style="text-align:center;padding:40px;background:#f9f9f9;border:1px solid #ddd;border-radius:6px">' +
      '<p style="margin-bottom:12px">Belum ada barang yang dibeli.</p>' +
      '<a href="index.html" class="btn">Mulai Belanja</a>' +
      '</div>';
    return;
  }

  var html = '<table class="tabel-pembelian">' +
    '<thead><tr>' +
    '<th>No. Transaksi</th>' +
    '<th>Tanggal</th>' +
    '<th>Nama Barang</th>' +
    '<th>Total</th>' +
    '<th>Status</th>' +
    '</tr></thead><tbody>';

  // urutkan terbaru di atas
  for (var i = pembelian.length - 1; i >= 0; i--) {
    var p = pembelian[i];
    html +=
      '<tr>' +
      '<td>#' + p.noTransaksi + '</td>' +
      '<td>' + p.tanggal + '</td>' +
      '<td>' + p.namaProduk + '</td>' +
      '<td>' + formatRupiah(p.total) + '</td>' +
      '<td><span class="badge-lunas">' + p.status + '</span></td>' +
      '</tr>';
  }
  html += '</tbody></table>';

  box.innerHTML = html;
}

// Login & Daftar
function handleLogin(e) {
  e.preventDefault();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var errorEl = document.getElementById("error");

  if (!email || !password) {
    errorEl.textContent = "Email dan password wajib diisi.";
    return;
  }

  var users = JSON.parse(localStorage.getItem("koleku_users") || "[]");
  var found = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].password === password) {
      found = users[i];
      break;
    }
  }

  if (!found) {
    errorEl.textContent = "Email atau password salah. Pastikan sudah daftar.";
    return;
  }

  localStorage.setItem("koleku_user", found.namaDepan + " " + found.namaBelakang);
  window.location.href = "index.html";
}

function handleDaftar(e) {
  e.preventDefault();
  var email = document.getElementById("email").value.trim();
  var namaDepan = document.getElementById("namaDepan").value.trim();
  var namaBelakang = document.getElementById("namaBelakang").value.trim();
  var password = document.getElementById("password").value;
  var errorEl = document.getElementById("error");

  if (!email || !namaDepan || !namaBelakang || !password) {
    errorEl.textContent = "Semua kolom wajib diisi.";
    return;
  }
  if (password.length < 6) {
    errorEl.textContent = "Password minimal 6 karakter.";
    return;
  }

  var users = JSON.parse(localStorage.getItem("koleku_users") || "[]");
  for (var i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      errorEl.textContent = "Email sudah terdaftar.";
      return;
    }
  }
  users.push({
    email: email,
    namaDepan: namaDepan,
    namaBelakang: namaBelakang,
    password: password,
  });
  localStorage.setItem("koleku_users", JSON.stringify(users));
  window.location.href = "akun-berhasil.html";
}

// Jalankan saat halaman siap
document.addEventListener("DOMContentLoaded", function () {
  renderNavbar();
  renderFooter();
  renderGridProduk();
  renderDetailProduk();
  renderCheckout();
  renderPembayaran();
  renderBarangSaya();
});
