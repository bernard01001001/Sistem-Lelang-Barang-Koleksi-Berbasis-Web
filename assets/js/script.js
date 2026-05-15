// Detect if current page is in root or pages/ subfolder
function isInPagesFolder() {
  var path = window.location.pathname;
  return path.indexOf('/pages/') !== -1;
}
function getPagePrefix() {
  return isInPagesFolder() ? '' : 'pages/';
}
function getRootPrefix() {
  return isInPagesFolder() ? '../' : '';
}
function getAssetPrefix() {
  return isInPagesFolder() ? '../assets/' : 'assets/';
}

function renderNavbar() {
  var user = localStorage.getItem("koleku_user");
  var pp = getPagePrefix(); // prefix for pages (login.html, etc.)
  var rp = getRootPrefix(); // prefix for root (index.html)
  var ap = getAssetPrefix(); // prefix for assets
  var menuKanan = "";

  if (user) {
    menuKanan = `
      <span style="font-weight:bold;color:#3f2e1e">Halo, ${user}</span>
      <a href="${pp}barang-saya.html">Barang Saya</a>
      <a href="#" onclick="logout()">Keluar</a>
      <a href="${pp}jual.html" class="btn">Jual Barang</a>
    `;
  } else {
    menuKanan = `
      <a href="${pp}login.html">Masuk</a>
      <a href="${pp}daftar.html">Daftar</a>
      <a href="${pp}jual.html" class="btn">Jual Barang</a>
    `;
  }

  var html = `
    <nav class="navbar">
      <a href="${rp}index.html" class="logo">
        <img src="${ap}images/logo.png" alt="KOLEKU">
      </a>
      <form class="search" onsubmit="cariProduk(event)">
        <input type="text" id="search-input" placeholder="Cari Barang berdasarkan kata kunci">
        <button type="submit">🔎</button>
      </form>
      <div class="menu">${menuKanan}</div>
    </nav>

    <div class="subnav">
      <a href="${rp}index.html">Beranda</a>
      <a href="${pp}kategori.html">Kategori</a>
      <a href="${pp}lelang-aktif.html">Lelang Aktif</a>
    </div>
  `;

  var nav = document.getElementById("navbar");
  if (nav) nav.innerHTML = html;
}
function renderFooter() {
  var rp = getRootPrefix();
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
  window.location.href = getRootPrefix() + "index.html";
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

// Load user-listed items from localStorage and add to produkList
(function loadUserItems() {
  try {
    var userItems = JSON.parse(localStorage.getItem("koleku_jualan") || "[]");
    for (var i = 0; i < userItems.length; i++) {
      // Skip expired auctions
      if (userItems[i].endTime && userItems[i].endTime < Date.now()) continue;
      produkList.push(userItems[i]);
    }
  } catch(e) { /* ignore parse errors */ }
})();

console.log("KOLEKU: script.js v2 loaded. Total produk:", produkList.length);

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function renderGridProduk() {
  var grid = document.getElementById("grid-produk");
  if (!grid) return;

  var pp = getPagePrefix();
  var html = "";
  for (var i = 0; i < produkList.length; i++) {
    var p = produkList[i];
    html +=
      '<a href="' + pp + 'produk.html?id=' + p.id + '" onclick="localStorage.setItem(\'koleku_last_viewed_id\', ' + p.id + ')">' +
      '<div class="card">' +
      '<img src="' + (isInPagesFolder() ? '' : '') + p.gambar + '" alt="' + p.nama + '" style="width:100%; height:160px; object-fit:cover;">' +
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

// === CHECKOUT STATE ===
var checkoutStep = 1;
var selectedPaymentMethod = '';
var selectedBank = '';
var selectedEwallet = '';

function renderCheckout() {
  var box = document.getElementById("checkout-step1-content");
  if (!box) return;

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get("id")) || 1;
  var produk = null;
  for (var i = 0; i < produkList.length; i++) {
    if (produkList[i].id === id) { produk = produkList[i]; break; }
  }
  if (!produk) produk = produkList[0];
  var ongkir = 25000;

  // Step 1: Shipping + Product Summary
  box.innerHTML =
    '<div class="checkout-box">' +
    '<h3>📦 Barang yang Dibeli</h3>' +
    '<div style="display:flex;gap:14px;align-items:center">' +
    '<img src="' + produk.gambar + '" alt="' + produk.nama + '" style="width:90px;height:90px;object-fit:cover;border-radius:8px;border:2px solid #e5d9c8;">' +
    '<div><div style="font-weight:bold;font-size:16px">' + produk.nama + '</div>' +
    '<div style="color:#b8860b;font-weight:bold;font-size:18px;margin-top:4px">' + formatRupiah(produk.hargaTertinggi) + '</div></div></div></div>' +
    '<div class="checkout-box">' +
    '<h3>📍 Alamat Pengiriman</h3>' +
    '<div class="form-group"><label>Nama Penerima</label><input type="text" id="ship-nama" placeholder="Nama lengkap"></div>' +
    '<div class="form-group"><label>Nomor HP</label><input type="text" id="ship-hp" placeholder="08xxxxxxxxx"></div>' +
    '<div class="form-group"><label>Alamat</label><textarea rows="3" id="ship-alamat" placeholder="Jl. ..."></textarea></div>' +
    '<div class="form-row"><div class="form-group"><label>Kota</label><input type="text" id="ship-kota"></div>' +
    '<div class="form-group"><label>Kode Pos</label><input type="text" id="ship-kodepos"></div></div></div>' +
    '<div class="step-nav"><div></div><button class="btn-next" onclick="goToStep(2)">Pilih Pembayaran →</button></div>';

  // Step 2: Payment Method
  var step2 = document.getElementById("checkout-step2-content");
  if (step2) {
    step2.innerHTML =
      '<div class="checkout-box"><h3>💳 Pilih Metode Pembayaran</h3>' +
      '<div class="payment-methods">' +
      '<div class="payment-method-card" id="pm-bank" onclick="selectPaymentMethod(\'bank\')">' +
      '<div class="payment-method-icon">🏦</div><div class="payment-method-info"><div class="pm-title">Transfer Bank</div><div class="pm-desc">BCA, BNI, Mandiri, BRI</div></div></div>' +
      '<div class="payment-method-card" id="pm-ewallet" onclick="selectPaymentMethod(\'ewallet\')">' +
      '<div class="payment-method-icon">📱</div><div class="payment-method-info"><div class="pm-title">E-Wallet</div><div class="pm-desc">GoPay, OVO, DANA, ShopeePay</div></div></div>' +
      '<div class="payment-method-card" id="pm-cc" onclick="selectPaymentMethod(\'cc\')">' +
      '<div class="payment-method-icon">💳</div><div class="payment-method-info"><div class="pm-title">Kartu Kredit/Debit</div><div class="pm-desc">Visa, Mastercard</div></div></div>' +
      '<div class="payment-method-card" id="pm-cod" onclick="selectPaymentMethod(\'cod\')">' +
      '<div class="payment-method-icon">🚚</div><div class="payment-method-info"><div class="pm-title">COD</div><div class="pm-desc">Bayar di Tempat</div></div></div>' +
      '</div><div id="payment-detail-area"></div></div>' +
      '<div class="step-nav"><button class="btn-prev" onclick="goToStep(1)">← Kembali</button>' +
      '<button class="btn-next" onclick="goToStep(3)">Konfirmasi →</button></div>';
  }
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;
  selectedBank = '';
  selectedEwallet = '';
  document.querySelectorAll('.payment-method-card').forEach(function(c) { c.classList.remove('selected'); });
  var el = document.getElementById('pm-' + method);
  if (el) el.classList.add('selected');

  var area = document.getElementById('payment-detail-area');
  if (!area) return;

  if (method === 'bank') {
    area.innerHTML =
      '<div style="margin-top:16px"><h4 style="margin-bottom:8px;color:#3f2e1e;">Pilih Bank:</h4>' +
      '<div class="bank-grid">' +
      '<div class="bank-option" onclick="selectBank(\'BCA\',this)"><div class="bank-logo">🏦</div><div class="bank-name">BCA</div></div>' +
      '<div class="bank-option" onclick="selectBank(\'BNI\',this)"><div class="bank-logo">🏛️</div><div class="bank-name">BNI</div></div>' +
      '<div class="bank-option" onclick="selectBank(\'Mandiri\',this)"><div class="bank-logo">🏢</div><div class="bank-name">Mandiri</div></div>' +
      '<div class="bank-option" onclick="selectBank(\'BRI\',this)"><div class="bank-logo">🏗️</div><div class="bank-name">BRI</div></div>' +
      '</div></div>';
  } else if (method === 'ewallet') {
    area.innerHTML =
      '<div style="margin-top:16px"><h4 style="margin-bottom:8px;color:#3f2e1e;">Pilih E-Wallet:</h4>' +
      '<div class="ewallet-grid">' +
      '<div class="ewallet-option" onclick="selectEwallet(\'GoPay\',this)"><div class="ew-icon">💚</div><div class="ew-name">GoPay</div></div>' +
      '<div class="ewallet-option" onclick="selectEwallet(\'OVO\',this)"><div class="ew-icon">💜</div><div class="ew-name">OVO</div></div>' +
      '<div class="ewallet-option" onclick="selectEwallet(\'DANA\',this)"><div class="ew-icon">💙</div><div class="ew-name">DANA</div></div>' +
      '<div class="ewallet-option" onclick="selectEwallet(\'ShopeePay\',this)"><div class="ew-icon">🧡</div><div class="ew-name">ShopeePay</div></div>' +
      '</div></div>';
  } else if (method === 'cc') {
    area.innerHTML =
      '<div style="margin-top:16px">' +
      '<div class="cc-preview"><div class="cc-chip"></div>' +
      '<div class="cc-number" id="cc-preview-num">•••• •••• •••• ••••</div>' +
      '<div class="cc-bottom"><div class="cc-name" id="cc-preview-name">NAMA PEMEGANG</div>' +
      '<div class="cc-expiry" id="cc-preview-exp">MM/YY</div></div></div>' +
      '<div class="cc-form-group"><label>Nomor Kartu</label>' +
      '<input type="text" id="cc-number" placeholder="1234 5678 9012 3456" maxlength="19" oninput="updateCCPreview()"></div>' +
      '<div class="cc-form-group"><label>Nama Pemegang Kartu</label>' +
      '<input type="text" id="cc-name" placeholder="Nama sesuai kartu" oninput="updateCCPreview()"></div>' +
      '<div class="cc-row"><div class="cc-form-group"><label>Masa Berlaku</label>' +
      '<input type="text" id="cc-expiry" placeholder="MM/YY" maxlength="5" oninput="updateCCPreview()"></div>' +
      '<div class="cc-form-group"><label>CVV</label>' +
      '<input type="password" id="cc-cvv" placeholder="•••" maxlength="4"></div></div></div>';
  } else if (method === 'cod') {
    area.innerHTML =
      '<div style="margin-top:16px;background:#f8f1e3;padding:16px;border-radius:10px;text-align:center;">' +
      '<div style="font-size:40px;margin-bottom:8px;">🚚</div>' +
      '<p style="font-weight:bold;color:#3f2e1e;">Bayar saat barang diterima</p>' +
      '<p style="font-size:13px;color:#888;">Siapkan uang pas saat kurir tiba di lokasi Anda.</p></div>';
  }
}

function selectBank(bank, el) {
  selectedBank = bank;
  document.querySelectorAll('.bank-option').forEach(function(b) { b.classList.remove('selected'); });
  el.classList.add('selected');
}

function selectEwallet(ew, el) {
  selectedEwallet = ew;
  document.querySelectorAll('.ewallet-option').forEach(function(b) { b.classList.remove('selected'); });
  el.classList.add('selected');
}

function updateCCPreview() {
  var num = document.getElementById('cc-number');
  var name = document.getElementById('cc-name');
  var exp = document.getElementById('cc-expiry');
  if (num) document.getElementById('cc-preview-num').textContent = num.value || '•••• •••• •••• ••••';
  if (name) document.getElementById('cc-preview-name').textContent = (name.value || 'NAMA PEMEGANG').toUpperCase();
  if (exp) document.getElementById('cc-preview-exp').textContent = exp.value || 'MM/YY';
}

function goToStep(step) {
  // Validate before advancing
  if (step === 2) {
    var nama = document.getElementById('ship-nama');
    var hp = document.getElementById('ship-hp');
    var alamat = document.getElementById('ship-alamat');
    if (nama && (!nama.value.trim() || !hp.value.trim() || !alamat.value.trim())) {
      alert('Mohon lengkapi data pengiriman (Nama, HP, dan Alamat wajib diisi).');
      return;
    }
  }
  if (step === 3) {
    if (!selectedPaymentMethod) { alert('Pilih metode pembayaran terlebih dahulu.'); return; }
    if (selectedPaymentMethod === 'bank' && !selectedBank) { alert('Pilih bank tujuan transfer.'); return; }
    if (selectedPaymentMethod === 'ewallet' && !selectedEwallet) { alert('Pilih e-wallet yang digunakan.'); return; }
    if (selectedPaymentMethod === 'cc') {
      var ccn = document.getElementById('cc-number');
      var ccname = document.getElementById('cc-name');
      if (ccn && (!ccn.value.trim() || ccn.value.trim().length < 16)) { alert('Masukkan nomor kartu kredit yang valid.'); return; }
      if (ccname && !ccname.value.trim()) { alert('Masukkan nama pemegang kartu.'); return; }
    }
    renderStep3Review();
  }

  checkoutStep = step;
  for (var s = 1; s <= 3; s++) {
    var content = document.getElementById('step-' + s);
    var indicator = document.getElementById('step-indicator-' + s);
    if (content) content.classList.toggle('active', s === step);
    if (indicator) {
      indicator.classList.remove('active', 'completed');
      if (s < step) indicator.classList.add('completed');
      else if (s === step) indicator.classList.add('active');
    }
    if (s < 3) {
      var line = document.getElementById('step-line-' + s);
      if (line) {
        line.classList.remove('completed', 'active');
        if (s < step - 1) line.classList.add('completed');
        else if (s === step - 1) line.classList.add('completed');
      }
    }
  }
}

function renderStep3Review() {
  var box = document.getElementById('checkout-step3-content');
  if (!box) return;

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get("id")) || 1;
  var produk = null;
  for (var i = 0; i < produkList.length; i++) {
    if (produkList[i].id === id) { produk = produkList[i]; break; }
  }
  if (!produk) produk = produkList[0];
  var ongkir = 25000;
  var total = produk.hargaTertinggi + ongkir;

  var shipNama = document.getElementById('ship-nama') ? document.getElementById('ship-nama').value : '-';
  var shipHp = document.getElementById('ship-hp') ? document.getElementById('ship-hp').value : '-';
  var shipAlamat = document.getElementById('ship-alamat') ? document.getElementById('ship-alamat').value : '-';
  var shipKota = document.getElementById('ship-kota') ? document.getElementById('ship-kota').value : '-';
  var shipKodepos = document.getElementById('ship-kodepos') ? document.getElementById('ship-kodepos').value : '-';

  var metodeLabel = '';
  if (selectedPaymentMethod === 'bank') metodeLabel = 'Transfer Bank - ' + selectedBank;
  else if (selectedPaymentMethod === 'ewallet') metodeLabel = 'E-Wallet - ' + selectedEwallet;
  else if (selectedPaymentMethod === 'cc') metodeLabel = 'Kartu Kredit/Debit';
  else if (selectedPaymentMethod === 'cod') metodeLabel = 'COD (Bayar di Tempat)';

  box.innerHTML =
    '<div class="review-section"><h4>📦 Produk</h4>' +
    '<div style="display:flex;gap:12px;align-items:center">' +
    '<img src="' + produk.gambar + '" style="width:60px;height:60px;object-fit:cover;border-radius:6px;">' +
    '<div><div style="font-weight:bold">' + produk.nama + '</div>' +
    '<div style="color:#b8860b;font-weight:bold">' + formatRupiah(produk.hargaTertinggi) + '</div></div></div></div>' +
    '<div class="review-section"><h4>📍 Pengiriman</h4>' +
    '<div class="review-item"><span class="review-label">Penerima</span><span class="review-value">' + shipNama + '</span></div>' +
    '<div class="review-item"><span class="review-label">No. HP</span><span class="review-value">' + shipHp + '</span></div>' +
    '<div class="review-item"><span class="review-label">Alamat</span><span class="review-value">' + shipAlamat + '</span></div>' +
    '<div class="review-item"><span class="review-label">Kota</span><span class="review-value">' + shipKota + '</span></div>' +
    '<div class="review-item"><span class="review-label">Kode Pos</span><span class="review-value">' + shipKodepos + '</span></div></div>' +
    '<div class="review-section"><h4>💳 Pembayaran</h4>' +
    '<div class="review-item"><span class="review-label">Metode</span><span class="review-value">' + metodeLabel + '</span></div></div>' +
    '<div class="review-section"><h4>💰 Ringkasan</h4>' +
    '<div class="review-item"><span class="review-label">Harga Barang</span><span class="review-value">' + formatRupiah(produk.hargaTertinggi) + '</span></div>' +
    '<div class="review-item"><span class="review-label">Ongkos Kirim</span><span class="review-value">' + formatRupiah(ongkir) + '</span></div>' +
    '<div style="display:flex;justify-content:space-between;padding:12px 0 0;margin-top:8px;border-top:2px dashed #e5d9c8;font-size:18px;font-weight:bold;color:#b8860b;">' +
    '<span>Total</span><span>' + formatRupiah(total) + '</span></div></div>' +
    '<div class="step-nav"><button class="btn-prev" onclick="goToStep(2)">← Kembali</button>' +
    '<button class="btn-next" style="background:linear-gradient(135deg,#27ae60,#2ecc71);box-shadow:0 4px 12px rgba(39,174,96,0.3);" onclick="bayar()">✓ Bayar Sekarang</button></div>';
}

function bayar() {
  var user = localStorage.getItem("koleku_user");
  if (!user) {
    alert("Silakan login dulu.");
    window.location.href = "login.html";
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var id = parseInt(params.get("id")) || 1;
  var produk = null;
  for (var i = 0; i < produkList.length; i++) {
    if (produkList[i].id === id) { produk = produkList[i]; break; }
  }
  if (!produk) produk = produkList[0];

  var metodeLabel = '';
  if (selectedPaymentMethod === 'bank') metodeLabel = 'Transfer Bank - ' + selectedBank;
  else if (selectedPaymentMethod === 'ewallet') metodeLabel = 'E-Wallet - ' + selectedEwallet;
  else if (selectedPaymentMethod === 'cc') metodeLabel = 'Kartu Kredit/Debit';
  else if (selectedPaymentMethod === 'cod') metodeLabel = 'COD (Bayar di Tempat)';

  var status = 'Lunas';
  if (selectedPaymentMethod === 'bank' || selectedPaymentMethod === 'ewallet') status = 'Menunggu Pembayaran';
  else if (selectedPaymentMethod === 'cod') status = 'COD';

  // Generate VA number for bank transfer
  var vaNumber = '';
  if (selectedPaymentMethod === 'bank') {
    var prefix = { BCA: '8800', BNI: '8810', Mandiri: '8820', BRI: '8830' };
    vaNumber = (prefix[selectedBank] || '8800') + ' ' +
      Math.floor(1000 + Math.random() * 9000) + ' ' +
      Math.floor(1000 + Math.random() * 9000) + ' ' +
      Math.floor(1000 + Math.random() * 9000);
  }

  var key = "koleku_pembelian_" + user;
  var pembelian = JSON.parse(localStorage.getItem(key) || "[]");
  var noTransaksi = "KLK-" + Date.now();
  var tanggal = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  var batasWaktu = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

  var shipNama = document.getElementById('ship-nama') ? document.getElementById('ship-nama').value : '-';
  var shipHp = document.getElementById('ship-hp') ? document.getElementById('ship-hp').value : '-';
  var shipAlamat = document.getElementById('ship-alamat') ? document.getElementById('ship-alamat').value : '-';
  var shipKota = document.getElementById('ship-kota') ? document.getElementById('ship-kota').value : '-';
  var shipKodepos = document.getElementById('ship-kodepos') ? document.getElementById('ship-kodepos').value : '-';

  pembelian.push({
    noTransaksi: noTransaksi,
    tanggal: tanggal,
    produkId: produk.id,
    namaProduk: produk.nama,
    gambar: produk.gambar,
    harga: produk.hargaTertinggi,
    ongkir: 25000,
    total: produk.hargaTertinggi + 25000,
    status: status,
    metode: metodeLabel,
    metodeTipe: selectedPaymentMethod,
    bank: selectedBank,
    ewallet: selectedEwallet,
    virtualAccount: vaNumber,
    batasWaktu: batasWaktu,
    penerima: { nama: shipNama, hp: shipHp, alamat: shipAlamat, kota: shipKota, kodePos: shipKodepos }
  });
  localStorage.setItem(key, JSON.stringify(pembelian));

  // Redirect based on payment method
  if (selectedPaymentMethod === 'bank' || selectedPaymentMethod === 'ewallet') {
    window.location.href = "proses-pembayaran.html?trx=" + noTransaksi;
  } else {
    window.location.href = "pembayaran.html?trx=" + noTransaksi;
  }
}

// === PROSES PEMBAYARAN PAGE ===
function renderProsesPembayaran() {
  var box = document.getElementById("proses-pembayaran-content");
  if (!box) return;

  var user = localStorage.getItem("koleku_user");
  if (!user) { box.innerHTML = '<p style="text-align:center;padding:40px;">Silakan login dulu.</p>'; return; }

  var params = new URLSearchParams(window.location.search);
  var trx = params.get("trx");
  var key = "koleku_pembelian_" + user;
  var pembelian = JSON.parse(localStorage.getItem(key) || "[]");
  var data = null;
  for (var i = 0; i < pembelian.length; i++) {
    if (pembelian[i].noTransaksi === trx) { data = pembelian[i]; break; }
  }
  if (!data) { box.innerHTML = '<p style="text-align:center">Transaksi tidak ditemukan.</p>'; return; }

  var html = '<h2>Selesaikan Pembayaran</h2>' +
    '<p class="subtitle">No. Transaksi: #' + data.noTransaksi + '</p>';

  if (data.metodeTipe === 'bank') {
    html +=
      '<div class="va-display">' +
      '<div class="va-bank">🏦 ' + data.bank + '</div>' +
      '<div class="va-label">Nomor Virtual Account</div>' +
      '<div class="va-number" id="va-number">' + data.virtualAccount + '</div>' +
      '<button class="va-copy-btn" id="va-copy-btn" onclick="copyVA()">📋 Salin Nomor</button></div>' +
      '<div class="payment-countdown"><div class="countdown-label">Batas Waktu Pembayaran</div>' +
      '<div class="countdown-timer" id="payment-timer">--:--:--</div></div>' +
      '<div class="review-section"><h4>💰 Total Pembayaran</h4>' +
      '<div style="text-align:center;font-size:28px;font-weight:bold;color:#b8860b;">' + formatRupiah(data.total) + '</div></div>' +
      '<div class="payment-instructions"><h4>Cara Pembayaran:</h4><ol>' +
      '<li>Buka aplikasi m-Banking atau ATM ' + data.bank + '</li>' +
      '<li>Pilih menu Transfer ke Virtual Account</li>' +
      '<li>Masukkan nomor VA: <b>' + data.virtualAccount + '</b></li>' +
      '<li>Masukkan jumlah: <b>' + formatRupiah(data.total) + '</b></li>' +
      '<li>Konfirmasi dan selesaikan pembayaran</li></ol></div>' +
      '<button class="btn-confirm-payment" onclick="konfirmasiPembayaran(\'' + data.noTransaksi + '\')">✓ Saya Sudah Membayar</button>';
  } else if (data.metodeTipe === 'ewallet') {
    html +=
      '<div class="qr-container">' +
      '<div class="qr-label">Scan QR Code dengan</div>' +
      '<div class="qr-ewallet">' + data.ewallet + '</div>' +
      '<div class="qr-code">📱</div></div>' +
      '<div class="payment-countdown"><div class="countdown-label">Batas Waktu Pembayaran</div>' +
      '<div class="countdown-timer" id="payment-timer">--:--:--</div></div>' +
      '<div class="review-section"><h4>💰 Total Pembayaran</h4>' +
      '<div style="text-align:center;font-size:28px;font-weight:bold;color:#b8860b;">' + formatRupiah(data.total) + '</div></div>' +
      '<div class="payment-instructions"><h4>Cara Pembayaran:</h4><ol>' +
      '<li>Buka aplikasi ' + data.ewallet + ' di smartphone Anda</li>' +
      '<li>Pilih menu Scan / Bayar</li>' +
      '<li>Arahkan kamera ke QR Code di atas</li>' +
      '<li>Konfirmasi pembayaran sebesar <b>' + formatRupiah(data.total) + '</b></li></ol></div>' +
      '<button class="btn-confirm-payment" onclick="konfirmasiPembayaran(\'' + data.noTransaksi + '\')">✓ Saya Sudah Membayar</button>';
  }

  box.innerHTML = html;

  // Start countdown
  if (data.batasWaktu) {
    var timerInterval = setInterval(function() {
      var timeLeft = data.batasWaktu - Date.now();
      var timerEl = document.getElementById('payment-timer');
      if (!timerEl) { clearInterval(timerInterval); return; }
      if (timeLeft <= 0) { timerEl.textContent = 'Waktu habis!'; clearInterval(timerInterval); return; }
      var h = Math.floor(timeLeft / (1000 * 60 * 60));
      var m = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      var s = Math.floor((timeLeft % (1000 * 60)) / 1000);
      timerEl.textContent = h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
    }, 1000);
  }
}

function copyVA() {
  var vaNum = document.getElementById('va-number');
  if (vaNum) {
    navigator.clipboard.writeText(vaNum.textContent.replace(/\s/g, '')).then(function() {
      var btn = document.getElementById('va-copy-btn');
      btn.textContent = '✓ Tersalin!';
      btn.classList.add('copied');
      setTimeout(function() { btn.textContent = '📋 Salin Nomor'; btn.classList.remove('copied'); }, 2000);
    });
  }
}

function konfirmasiPembayaran(trxNo) {
  var user = localStorage.getItem("koleku_user");
  if (!user) return;
  var key = "koleku_pembelian_" + user;
  var pembelian = JSON.parse(localStorage.getItem(key) || "[]");
  for (var i = 0; i < pembelian.length; i++) {
    if (pembelian[i].noTransaksi === trxNo) {
      pembelian[i].status = 'Lunas';
      break;
    }
  }
  localStorage.setItem(key, JSON.stringify(pembelian));
  window.location.href = "pembayaran.html?trx=" + trxNo;
}

// === PEMBAYARAN SUCCESS PAGE ===
function renderPembayaran() {
  var box = document.getElementById("pembayaran-receipt");
  if (!box) return;

  var user = localStorage.getItem("koleku_user");
  if (!user) { box.innerHTML = "<p>Silakan login dulu.</p>"; return; }

  var params = new URLSearchParams(window.location.search);
  var trx = params.get("trx");
  var key = "koleku_pembelian_" + user;
  var pembelian = JSON.parse(localStorage.getItem(key) || "[]");
  var data = null;
  for (var i = 0; i < pembelian.length; i++) {
    if (pembelian[i].noTransaksi === trx) { data = pembelian[i]; break; }
  }
  if (!data && pembelian.length > 0) data = pembelian[pembelian.length - 1];
  if (!data) { box.innerHTML = "<p>Belum ada transaksi.</p>"; return; }

  var statusBadge = '<span class="badge-lunas">' + data.status + '</span>';
  if (data.status === 'Menunggu Pembayaran') statusBadge = '<span class="badge-menunggu">' + data.status + '</span>';
  else if (data.status === 'COD') statusBadge = '<span class="badge-cod">' + data.status + '</span>';

  box.innerHTML =
    '<div class="receipt-card">' +
    '<div class="receipt-header"><h3>KOLEKU</h3><div class="receipt-no">#' + data.noTransaksi + '</div></div>' +
    '<div class="receipt-row"><span class="receipt-label">Tanggal</span><span class="receipt-value">' + data.tanggal + '</span></div>' +
    '<div class="receipt-row"><span class="receipt-label">Barang</span><span class="receipt-value">' + data.namaProduk + '</span></div>' +
    '<div class="receipt-row"><span class="receipt-label">Harga</span><span class="receipt-value">' + formatRupiah(data.harga) + '</span></div>' +
    '<div class="receipt-row"><span class="receipt-label">Ongkir</span><span class="receipt-value">' + formatRupiah(data.ongkir) + '</span></div>' +
    '<div class="receipt-total"><span>Total</span><span>' + formatRupiah(data.total) + '</span></div>' +
    '<div class="receipt-row" style="margin-top:12px;border-top:1px solid #f4f4f4;padding-top:12px;">' +
    '<span class="receipt-label">Metode</span><span class="receipt-value">' + data.metode + '</span></div>' +
    '<div class="receipt-row"><span class="receipt-label">Status</span><span class="receipt-value">' + statusBadge + '</span></div></div>';
}

function renderBarangSaya() {
  var box = document.getElementById("barang-saya");
  if (!box) return;

  var user = localStorage.getItem("koleku_user");
  if (!user) {
    box.innerHTML =
      '<p style="text-align:center;padding:40px">' +
      'Anda belum login. <a href="' + getPagePrefix() + 'login.html">Masuk dulu</a> untuk melihat barang yang sudah dibeli.' +
      '</p>';
    return;
  }

  var key = "koleku_pembelian_" + user;
  var pembelian = JSON.parse(localStorage.getItem(key) || "[]");

  if (pembelian.length === 0) {
    box.innerHTML =
      '<div style="text-align:center;padding:40px;background:#f9f9f9;border:1px solid #ddd;border-radius:6px">' +
      '<p style="margin-bottom:12px">Belum ada barang yang dibeli.</p>' +
      '<a href="' + getRootPrefix() + 'index.html" class="btn">Mulai Belanja</a>' +
      '</div>';
    return;
  }

  var html = '<div class="order-list">';

  for (var i = pembelian.length - 1; i >= 0; i--) {
    var p = pembelian[i];
    var badgeClass = 'badge-lunas';
    if (p.status === 'Menunggu Pembayaran') badgeClass = 'badge-menunggu';
    else if (p.status === 'COD') badgeClass = 'badge-cod';

    // Perbaikan path gambar dengan (isInPagesFolder() ? '../' : '') + p.gambar agar tampil jika relative
    var imgSrc = p.gambar;
    if (imgSrc && imgSrc.startsWith("assets")) {
        imgSrc = getRootPrefix() + imgSrc;
    } else if (imgSrc && imgSrc.startsWith("../assets")) {
        imgSrc = getPagePrefix() === '' ? imgSrc : imgSrc.replace("../", "");
    }
    
    var imgHtml = imgSrc ? '<img src="' + imgSrc + '" class="order-img" alt="Barang">' : '<div class="order-img" style="display:flex;align-items:center;justify-content:center;color:#ccc;font-size:24px;background:#f0f0f0;">📦</div>';

    html +=
      '<div class="order-card">' +
        '<div class="order-header">' +
          '<div class="order-date-trx">' +
            '<span style="font-size:16px;">🛍️</span>' +
            '<span style="font-weight:bold;color:#333;">Belanja</span>' +
            '<span>' + p.tanggal + '</span>' +
            '<span style="color:#e0e0e0;">|</span>' +
            '<span style="font-family:monospace;color:#999;">#' + p.noTransaksi + '</span>' +
          '</div>' +
          '<span class="' + badgeClass + '" style="font-weight:bold;padding:6px 16px;border-radius:20px;font-size:12px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">' + p.status + '</span>' +
        '</div>' +
        '<div class="order-body">' +
          imgHtml +
          '<div class="order-details">' +
            '<div class="order-name">' + p.namaProduk + '</div>' +
            '<div class="order-meta">Metode Pembayaran: <b>' + (p.metode || 'Transfer Bank') + '</b></div>' +
          '</div>' +
          '<div class="order-price">' +
            '<div style="font-size:12px;color:#888;text-align:right;margin-bottom:4px;">Total Belanja</div>' +
            '<div>' + formatRupiah(p.total) + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }
  html += '</div>';

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
  window.location.href = getRootPrefix() + "index.html";
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
  renderProsesPembayaran();
});
