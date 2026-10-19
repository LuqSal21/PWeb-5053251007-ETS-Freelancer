const KATEGORI = [
  'Proyek',
  'Peralatan',
  'Software',
  'Transportasi',
  'Makan',
  'Lainnya'
];

const pilihKategori = document.querySelector('#kategori');

KATEGORI.forEach(function (kategori) {
  const opsi = document.createElement('option');
  opsi.value = kategori;
  opsi.textContent = kategori;
  pilihKategori.appendChild(opsi);
});