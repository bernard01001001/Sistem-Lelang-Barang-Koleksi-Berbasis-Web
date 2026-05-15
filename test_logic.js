const produkList = [{"id_barang":29,"nama_barang":"Keris Empu Gandring Tiruan","harga_awal":7700000,"deskripsi":"Koleksi spesial: Keris Empu Gandring Tiruan. Sangat langka dan bernilai tinggi. Jadwal lelang telah ditentukan.","status":"approved","id_user":26,"id_pemenang":null,"status_lelang":"berjalan","tanggal_selesai":"2026-05-18T03:03:00.672Z","gambar":"https://picsum.photos/seed/100/400/300","tanggal_mulai":"2026-05-15T15:03:00.672Z","harga_tertinggi":7700000}];
let displayList = produkList;
const now = new Date();
displayList = produkList.filter(p => new Date(p.tanggal_mulai) <= now);
console.log("Filtered Length:", displayList.length);
for (var i = 0; i < displayList.length; i++) {
  var p = displayList[i];
  var startDate = new Date(p.tanggal_mulai);
  var endDate = new Date(p.tanggal_selesai);
  
  var metaStatus = "";
  if (startDate > now) {
     metaStatus = "Akan Datang: " + startDate.toLocaleDateString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit'});
  } else if (endDate > now) {
     metaStatus = "Berjalan (Sisa: " + endDate.toLocaleDateString('id-ID', {day: 'numeric', month: 'short'}) + ")";
  } else {
     metaStatus = "Berakhir";
  }
  console.log(metaStatus);
}
