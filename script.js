const KATEGORI = [
  'Proyek',
  'Peralatan',
  'Software',
  'Transportasi',
  'Makan',
  'Lainnya'
];

const transaksi = [];
const pilihKategori = document.querySelector('#kategori');
const formTransaksi = document.querySelector('#form-transaksi');
const pesanForm = document.querySelector('#pesan-form');
const isiTabel = document.querySelector('#isi-tabel');
const pesanKosong = document.querySelector('#pesan-kosong');

KATEGORI.forEach(function (kategori) {
  const opsi = document.createElement('option');
  opsi.value = kategori;
  opsi.textContent = kategori;
  pilihKategori.appendChild(opsi);
});

function buatSel(teks) {
  const sel = document.createElement('td');
  sel.textContent = teks;
  return sel;
}

function buatBaris(item) {
  const baris = document.createElement('tr');
  const catatan = item.catatan || 'Tanpa catatan';
  baris.appendChild(buatSel(item.tanggal));
  baris.appendChild(buatSel(catatan));
  baris.appendChild(buatSel(item.kategori));
  baris.appendChild(buatSel(item.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'));
  baris.appendChild(buatSel('Rp ' + item.nominal.toLocaleString('id-ID')));
  baris.appendChild(buatSel(''));
  return baris;
}

function renderDaftar() {
  isiTabel.innerHTML = '';
  const transaksiTerbaru = [...transaksi].sort(function (a, b) {
    return b.tanggal.localeCompare(a.tanggal) || b.id - a.id;
  });
  transaksiTerbaru.forEach(function (item) {
    isiTabel.appendChild(buatBaris(item));
  });
  pesanKosong.textContent = transaksiTerbaru.length === 0
    ? 'Belum ada transaksi.'
    : '';
}

function tambahTransaksi(event) {
  event.preventDefault();
  const nominal = Number(document.querySelector('#jumlah').value);
  const tanggal = document.querySelector('#tanggal').value;
  const kategori = pilihKategori.value;
  if (nominal <= 0 || !tanggal || !kategori) {
    pesanForm.textContent = 'Isi tanggal dan kategori, serta masukkan nominal lebih dari 0.';
    return;
  }
  transaksi.push({
    id: Date.now(),
    tanggal: tanggal,
    jenis: document.querySelector('#tipe').value,
    kategori: kategori,
    nominal: nominal,
    catatan: document.querySelector('#deskripsi').value.trim()
  });
  pesanForm.textContent = '';
  formTransaksi.reset();
  renderDaftar();
}

formTransaksi.addEventListener('submit', tambahTransaksi);
renderDaftar();