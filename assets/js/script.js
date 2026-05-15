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

function getUser() {
  const user = localStorage.getItem("koleku_user");
  return user ? JSON.parse(user) : null;
}

function renderNavbar() {
  var user = getUser();
  var pp = getPagePrefix();
  var rp = getRootPrefix();
  var ap = getAssetPrefix();
  var menuKanan = "";

  if (user) {
    let extraMenu = '';
    if (user.role === 'admin') {
      extraMenu += `<a href="${pp}admin.html">Dashboard Admin</a>`;
      extraMenu += `<a href="${pp}jual.html" class="btn">Jual Barang</a>`;
    } else if (user.role === 'pelelang') {
      extraMenu += `<a href="${pp}jual.html" class="btn">Jual Barang</a>`;
    }

    menuKanan = `
      <span style="font-weight:bold;color:#3f2e1e">Halo, ${user.nama} (${user.role})</span>
      <a href="${pp}barang-saya.html">Barang Saya</a>
      ${extraMenu}
      <a href="#" onclick="logout()">Keluar</a>
    `;
  } else {
    menuKanan = `
      <a href="${pp}login.html">Masuk</a>
      <a href="${pp}daftar.html">Daftar</a>
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
  var html =
    '<footer class="footer">' +
    '<p>&copy; 2025 KOLEKU - Platform Lelang Online</p>' +
    '<div style="margin-top:8px">' +
    '<a href="#">Tentang</a><a href="#">Kontak</a><a href="#">Syarat & Ketentuan</a><a href="#">Bantuan</a>' +
    '</div></footer>';
  var f = document.getElementById("footer");
  if (f) f.innerHTML = html;
}

function logout() {
  localStorage.removeItem("koleku_user");
  window.location.href = getRootPrefix() + "index.html";
}

function cariProduk(e) {
  e.preventDefault();
  alert("Pencarian belum diimplementasi");
}

function formatRupiah(angka) {
  return "Rp " + Number(angka).toLocaleString("id-ID");
}

async function renderGridProduk() {
  var grid = document.getElementById("grid-produk");
  if (!grid) return;

  try {
    const res = await fetch('/barang');
    const produkList = await res.json();
    
    var pp = getPagePrefix();
    var html = "";
    if(produkList.length === 0) {
       grid.innerHTML = "<p>Tidak ada barang lelang saat ini.</p>";
       return;
    }

    for (var i = 0; i < produkList.length; i++) {
      var p = produkList[i];
      var sisaWaktu = new Date(p.tanggal_selesai) > new Date() ? "Berjalan" : "Berakhir";
      html +=
        '<a href="' + pp + 'produk.html?id=' + p.id_barang + '">' +
        '<div class="card">' +
        '<img src="' + p.gambar + '" alt="' + p.nama_barang + '" style="width:100%; height:160px; object-fit:cover;">' +
        '<div class="body">' +
        '<div class="title">' + p.nama_barang + '</div>' +
        '<div class="price">' + formatRupiah(p.harga_tertinggi || p.harga_awal) + '</div>' +
        '<div class="meta">Status: ' + sisaWaktu + '</div>' +
        '</div></div></a>';
    }
    grid.innerHTML = html;
  } catch(e) {
    grid.innerHTML = "<p>Gagal memuat barang.</p>";
  }
}

async function renderDetailProduk() {
  var detail = document.getElementById("detail-produk");
  if (!detail) return;

  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  if(!id) return;

  try {
    const res = await fetch('/barang/' + id);
    if(!res.ok) {
       detail.innerHTML = "<p>Produk tidak ditemukan.</p>";
       return;
    }
    const produk = await res.json();
    
    var minBid = Number(produk.harga_tertinggi || produk.harga_awal) + 10000;

    var html =
      '<div class="img-box"><img src="' + produk.gambar + '" alt="' + produk.nama_barang + '" style="width:100%; border-radius:8px;"></div>' +
      '<div>' +
      '<h1>' + produk.nama_barang + '</h1>' +
      '<p class="info"><span>Deskripsi:</span> ' + produk.deskripsi + '</p>' +
      '<div class="harga-box">' +
      '<div class="label">Harga Awal</div>' +
      '<div class="value" style="font-size:16px">' + formatRupiah(produk.harga_awal) + '</div>' +
      '</div>' +
      '<div class="harga-box">' +
      '<div class="label">Harga Tertinggi Saat Ini</div>' +
      '<div class="value">' + formatRupiah(produk.harga_tertinggi || produk.harga_awal) + '</div>' +
      '</div>' +
      '<div class="timer" style="background:#c0392b; color:white; padding:12px 20px; border-radius:6px; text-align:center; font-weight:bold; font-size:18px; margin:20px 0;">Sisa Waktu: <span id="countdown-detail" style="font-size:22px;">Menghitung...</span></div>';

    var user = getUser();
    if (!user || user.role !== 'pelelang') {
        html += '<form class="bid-form" onsubmit="kirimBid(event,' + produk.id_barang + ')">' +
                '<input type="number" id="bid-input" placeholder="Tawaran Anda (min ' + minBid + ')" required>' +
                '<button class="btn" type="submit">Tawar</button>' +
                '</form>' +
                '<a href="checkout.html?id=' + produk.id_barang + '" class="btn btn-block">Beli Sekarang</a>';
    } else {
        html += '<div style="margin-top: 15px; padding: 10px; background-color: #f8f1e3; border: 1px solid #e5d9c8; border-radius: 8px; text-align: center; color: #b8860b;">' +
                '<strong>Anda masuk sebagai Pelelang.</strong><br>Pelelang tidak dapat menawar atau membeli barang.' +
                '</div>';
    }

    html += '</div>';

    detail.innerHTML = html;
    startDynamicCountdown(produk.tanggal_selesai);
  } catch(e) {
    detail.innerHTML = "<p>Gagal memuat detail.</p>";
  }
}

function startDynamicCountdown(endTimeStr) {
  const endTime = new Date(endTimeStr).getTime();
  
  function updateCountdown() {
    const countdownEl = document.getElementById("countdown-detail");
    if (!countdownEl) return; // Stop if element is not on page

    const timeLeft = endTime - Date.now();

    if (timeLeft <= 0) {
      countdownEl.textContent = "Lelang telah berakhir";
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownEl.textContent = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

async function kirimBid(e, id_barang) {
  e.preventDefault();
  var user = getUser();
  if (!user) {
    alert("Silakan login dulu untuk menawar.");
    window.location.href = "login.html";
    return;
  }
  if (user.role === 'pelelang') {
    alert("Pelelang tidak dapat menawar barang.");
    return;
  }
  var nilai = parseInt(document.getElementById("bid-input").value);
  if (!nilai || nilai <= 0) {
    alert("Masukkan tawaran yang benar.");
    return;
  }
  
  try {
     const res = await fetch('/lelang/bid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_barang: id_barang, id_user: user.id, harga_penawaran: nilai })
     });
     const data = await res.json();
     if(!res.ok) throw new Error(data.message || data.error);
     alert("Tawaran berhasil dikirim!");
     window.location.reload();
  } catch(err) {
     alert(err.message);
  }
}

// === CHECKOUT STATE ===
var checkoutStep = 1;
var selectedPaymentMethod = '';
var selectedBank = '';
var selectedEwallet = '';

async function renderCheckout() {
  var box = document.getElementById("checkout-step1-content");
  if (!box) return;

  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  if(!id) return;
  
  try {
    const res = await fetch('/barang/' + id);
    if(!res.ok) return;
    const produk = await res.json();

    box.innerHTML =
      '<div class="checkout-box">' +
      '<h3>📦 Barang yang Dibeli</h3>' +
      '<div style="display:flex;gap:14px;align-items:center">' +
      '<img src="' + produk.gambar + '" alt="' + produk.nama_barang + '" style="width:90px;height:90px;object-fit:cover;border-radius:8px;border:2px solid #e5d9c8;">' +
      '<div><div style="font-weight:bold;font-size:16px">' + produk.nama_barang + '</div>' +
      '<div style="color:#b8860b;font-weight:bold;font-size:18px;margin-top:4px">' + formatRupiah(produk.harga_tertinggi || produk.harga_awal) + '</div></div></div></div>' +
      '<div class="checkout-box">' +
      '<h3>📍 Alamat Pengiriman</h3>' +
      '<div class="form-group"><label>Nama Penerima</label><input type="text" id="ship-nama" placeholder="Nama lengkap"></div>' +
      '<div class="form-group"><label>Nomor HP</label><input type="text" id="ship-hp" placeholder="08xxxxxxxxx"></div>' +
      '<div class="form-group"><label>Alamat</label><textarea rows="3" id="ship-alamat" placeholder="Jl. ..."></textarea></div>' +
      '<div class="form-row"><div class="form-group"><label>Kota</label><input type="text" id="ship-kota"></div>' +
      '<div class="form-group"><label>Kode Pos</label><input type="text" id="ship-kodepos"></div></div></div>' +
      '<div class="step-nav"><div></div><button class="btn-next" onclick="goToStep(2)">Pilih Pembayaran →</button></div>';

    var step2 = document.getElementById("checkout-step2-content");
    if (step2) {
      step2.innerHTML =
        '<div class="checkout-box"><h3>💳 Pilih Metode Pembayaran</h3>' +
        '<div class="payment-methods">' +
        '<div class="payment-method-card" id="pm-bank" onclick="selectPaymentMethod(\'bank\')">' +
        '<div class="payment-method-icon">🏦</div><div class="payment-method-info"><div class="pm-title">Transfer Bank</div><div class="pm-desc">BCA, BNI, Mandiri, BRI</div></div></div>' +
        '<div class="payment-method-card" id="pm-ewallet" onclick="selectPaymentMethod(\'ewallet\')">' +
        '<div class="payment-method-icon">📱</div><div class="payment-method-info"><div class="pm-title">E-Wallet</div><div class="pm-desc">GoPay, OVO, DANA</div></div></div>' +
        '<div class="payment-method-card" id="pm-cod" onclick="selectPaymentMethod(\'cod\')">' +
        '<div class="payment-method-icon">🚚</div><div class="payment-method-info"><div class="pm-title">COD</div><div class="pm-desc">Bayar di Tempat</div></div></div>' +
        '</div><div id="payment-detail-area"></div></div>' +
        '<div class="step-nav"><button class="btn-prev" onclick="goToStep(1)">← Kembali</button>' +
        '<button class="btn-next" onclick="goToStep(3)">Konfirmasi →</button></div>';
    }
  } catch(e) { }
}

function selectPaymentMethod(method) {
  selectedPaymentMethod = method;
  selectedBank = ''; selectedEwallet = '';
  document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('pm-' + method).classList.add('selected');

  var area = document.getElementById('payment-detail-area');
  if (method === 'bank') {
    area.innerHTML = '<div style="margin-top:16px"><h4 style="margin-bottom:8px;">Pilih Bank:</h4><div class="bank-grid"><div class="bank-option" onclick="selectBank(\'BCA\',this)">BCA</div><div class="bank-option" onclick="selectBank(\'BNI\',this)">BNI</div><div class="bank-option" onclick="selectBank(\'Mandiri\',this)">Mandiri</div><div class="bank-option" onclick="selectBank(\'BRI\',this)">BRI</div></div></div>';
  } else if (method === 'ewallet') {
    area.innerHTML = '<div style="margin-top:16px"><h4 style="margin-bottom:8px;">Pilih E-Wallet:</h4><div class="ewallet-grid"><div class="ewallet-option" onclick="selectEwallet(\'GoPay\',this)">GoPay</div><div class="ewallet-option" onclick="selectEwallet(\'OVO\',this)">OVO</div><div class="ewallet-option" onclick="selectEwallet(\'DANA\',this)">DANA</div></div></div>';
  } else if (method === 'cod') {
    area.innerHTML = '<div style="margin-top:16px;padding:16px;background:#f8f1e3;">COD: Bayar di tempat saat barang sampai.</div>';
  } else {
    area.innerHTML = '';
  }
}

function selectBank(bank, el) {
  selectedBank = bank;
  document.querySelectorAll('.bank-option').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}
function selectEwallet(ew, el) {
  selectedEwallet = ew;
  document.querySelectorAll('.ewallet-option').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function goToStep(step) {
  if (step === 2) {
    var nama = document.getElementById('ship-nama');
    if (nama && !nama.value.trim()) { alert('Mohon lengkapi data pengiriman.'); return; }
  }
  if (step === 3) {
    if (!selectedPaymentMethod) { alert('Pilih metode pembayaran terlebih dahulu.'); return; }
    if (selectedPaymentMethod === 'bank' && !selectedBank) { alert('Pilih bank.'); return; }
    if (selectedPaymentMethod === 'ewallet' && !selectedEwallet) { alert('Pilih e-wallet.'); return; }
    renderStep3Review();
  }
  checkoutStep = step;
  for (var s = 1; s <= 3; s++) {
    var content = document.getElementById('step-' + s);
    if (content) content.classList.toggle('active', s === step);
  }
}

async function renderStep3Review() {
  var box = document.getElementById('checkout-step3-content');
  if (!box) return;

  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  const res = await fetch('/barang/' + id);
  const produk = await res.json();
  var ongkir = 25000;
  var total = Number(produk.harga_tertinggi || produk.harga_awal) + ongkir;

  var metodeLabel = selectedPaymentMethod;
  if(selectedPaymentMethod === 'bank') metodeLabel += ' - ' + selectedBank;
  if(selectedPaymentMethod === 'ewallet') metodeLabel += ' - ' + selectedEwallet;

  box.innerHTML =
    '<div class="review-section"><h4>📦 Produk</h4><div>' + produk.nama_barang + ' - ' + formatRupiah(produk.harga_tertinggi || produk.harga_awal) + '</div></div>' +
    '<div class="review-section"><h4>💳 Pembayaran</h4><div>' + metodeLabel + '</div></div>' +
    '<div class="review-section"><h4>💰 Total</h4><div style="font-size:20px;font-weight:bold;color:#b8860b">' + formatRupiah(total) + '</div></div>' +
    '<div class="step-nav"><button class="btn-prev" onclick="goToStep(2)">← Kembali</button>' +
    '<button class="btn-next" onclick="bayar()">✓ Bayar Sekarang</button></div>';
}

async function bayar() {
  var user = getUser();
  if (!user) return;
  if (user.role === 'pelelang') {
    alert("Pelelang tidak dapat membeli barang.");
    return;
  }
  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");

  const resBarang = await fetch('/barang/' + id);
  const produk = await resBarang.json();
  var total = Number(produk.harga_tertinggi || produk.harga_awal) + 25000;

  var metodeLabel = selectedPaymentMethod;
  if (selectedPaymentMethod === 'bank') metodeLabel += ' - ' + selectedBank;
  if (selectedPaymentMethod === 'ewallet') metodeLabel += ' - ' + selectedEwallet;

  var vaNumber = '';
  if (selectedPaymentMethod === 'bank') vaNumber = '8800' + Math.floor(10000000 + Math.random() * 90000000);

  try {
     const res = await fetch('/pembayaran/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id_user: user.id,
            id_barang: id,
            total: total,
            metode: metodeLabel,
            status: selectedPaymentMethod === 'cod' ? 'COD' : 'Menunggu Pembayaran',
            virtual_account: vaNumber,
            batas_waktu: new Date(Date.now() + 86400000).toISOString()
        })
     });
     const result = await res.json();
     
     if (selectedPaymentMethod === 'bank' || selectedPaymentMethod === 'ewallet') {
       window.location.href = "proses-pembayaran.html?trx=" + result.id_pembayaran;
     } else {
       window.location.href = "pembayaran.html?trx=" + result.id_pembayaran;
     }
  } catch(e) {
     alert('Gagal membuat pembayaran');
  }
}

// === PROSES PEMBAYARAN PAGE ===
async function renderProsesPembayaran() {
  var box = document.getElementById("proses-pembayaran-content");
  if (!box) return;

  var params = new URLSearchParams(window.location.search);
  var trx = params.get("trx");
  if(!trx) return;

  try {
     const res = await fetch('/pembayaran/' + trx);
     if(!res.ok) { box.innerHTML = "<p>Transaksi tidak ditemukan</p>"; return; }
     const data = await res.json();

     var html = '<h2>Selesaikan Pembayaran</h2><p class="subtitle">No. Transaksi: #' + data.id_pembayaran + '</p>';
     if (data.metode.includes('bank')) {
       html += '<div class="va-display"><div class="va-number">' + data.virtual_account + '</div></div>' +
               '<div class="review-section"><h4>💰 Total Pembayaran</h4><h2>' + formatRupiah(data.total) + '</h2></div>' +
               '<button class="btn-confirm-payment" onclick="konfirmasiPembayaran(' + data.id_pembayaran + ')">✓ Saya Sudah Membayar</button>';
     } else if (data.metode.includes('ewallet')) {
       html += '<div class="qr-container"><div class="qr-code">📱</div></div>' +
               '<div class="review-section"><h4>💰 Total Pembayaran</h4><h2>' + formatRupiah(data.total) + '</h2></div>' +
               '<button class="btn-confirm-payment" onclick="konfirmasiPembayaran(' + data.id_pembayaran + ')">✓ Saya Sudah Membayar</button>';
     }
     box.innerHTML = html;
  } catch(e) {}
}

async function konfirmasiPembayaran(trx) {
  try {
     await fetch('/pembayaran/confirm/' + trx, { method: 'PUT' });
     window.location.href = "pembayaran.html?trx=" + trx;
  } catch(e) {}
}

async function renderPembayaran() {
  var box = document.getElementById("pembayaran-receipt");
  if (!box) return;

  var params = new URLSearchParams(window.location.search);
  var trx = params.get("trx");
  if(!trx) return;

  try {
     const res = await fetch('/pembayaran/' + trx);
     const data = await res.json();
     box.innerHTML =
       '<div class="receipt-card">' +
       '<div class="receipt-header"><h3>KOLEKU</h3><div class="receipt-no">#' + data.id_pembayaran + '</div></div>' +
       '<div class="receipt-row"><span class="receipt-label">Metode</span><span class="receipt-value">' + data.metode + '</span></div>' +
       '<div class="receipt-total"><span>Total</span><span>' + formatRupiah(data.total) + '</span></div>' +
       '<div class="receipt-row"><span class="receipt-label">Status</span><span class="receipt-value">' + data.status + '</span></div></div>';
  } catch(e) {}
}

async function renderBarangSaya() {
  var box = document.getElementById("barang-saya");
  if (!box) return;

  var user = getUser();
  if (!user) {
    box.innerHTML = '<p>Silakan login dulu.</p>';
    return;
  }

  try {
     const res = await fetch('/pembayaran/user/' + user.id);
     const pembelian = await res.json();
     
     if (pembelian.length === 0) {
       box.innerHTML = '<p>Belum ada barang yang dibeli.</p>';
       return;
     }

     var html = '<div class="order-list">';
     for (var i = 0; i < pembelian.length; i++) {
       var p = pembelian[i];
       html +=
         '<div class="order-card">' +
         '<div class="order-header"><span>#' + p.id_pembayaran + '</span><span>' + p.status + '</span></div>' +
         '<div class="order-body"><div class="order-details"><div>' + (p.nama_barang || 'Barang') + '</div></div>' +
         '<div class="order-price"><div>' + formatRupiah(p.total) + '</div></div></div></div>';
     }
     html += '</div>';
     box.innerHTML = html;
  } catch(e) {}
}

// Login & Daftar (Backend)
async function handleLogin(e) {
  e.preventDefault();
  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var errorEl = document.getElementById("error");

  try {
     const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
     });
     const data = await res.json();
     if(!res.ok) throw new Error(data.message || data.error);
     
     localStorage.setItem("koleku_user", JSON.stringify(data.user));
     window.location.href = getRootPrefix() + "index.html";
  } catch(err) {
     errorEl.textContent = err.message;
  }
}

async function handleDaftar(e) {
  e.preventDefault();
  var email = document.getElementById("email").value.trim();
  var namaDepan = document.getElementById("namaDepan").value.trim();
  var namaBelakang = document.getElementById("namaBelakang").value.trim();
  var password = document.getElementById("password").value;
  var role = document.getElementById("role") ? document.getElementById("role").value : 'penawar';
  var errorEl = document.getElementById("error");

  try {
     const res = await fetch('/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: namaDepan + ' ' + namaBelakang, email, password, role: role })
     });
     const data = await res.json();
     if(!res.ok) throw new Error(data.error || data.message);
     
     window.location.href = "akun-berhasil.html";
  } catch(err) {
     errorEl.textContent = err.message;
  }
}

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
