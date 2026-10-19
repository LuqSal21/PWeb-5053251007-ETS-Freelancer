# BRIEF: Catatan Kas Freelancer (ETS Pemrograman Web, ITS)

## 1. Konteks dan peranmu
Ini ETS individu: hackathon 2,5 jam, lalu evaluasi lisan yang menyumbang 70% nilai. Di evaluasi lisan saya harus menelusuri alur kode, menebak akibat perubahan kode, dan mengubah kode TANPA AI dan tanpa internet. Jadi kode harus kecil, sederhana, dan bergaya mahasiswa yang rajin, bukan engineer senior yang pamer. AI boleh dipakai, tapi setiap pemakaian dicatat di AI-LOG.md, jadi kerjakan dalam langkah kecil (bagian 9). Kalau ragu, pilih cara yang lebih sederhana dan lebih mudah saya jelaskan. Jangan menambah fitur yang tidak diminta.

## 2. Persona dan fitur khas (WAJIB)
Persona: pekerja lepas (freelancer). Pemasukan datang per proyek dan klien sering terlambat membayar.

Fitur khas:
- Catat tagihan ke klien dengan status "belum dibayar" atau "lunas".
- Tagihan yang dilunasi OTOMATIS menjadi pemasukan.
- Tampilkan total piutang.
- Memakai data transaksi yang sama di localStorage, bukan halaman terpisah.

## 3. Stack dan berkas
- Hanya HTML, CSS, dan JavaScript biasa (vanilla). Tanpa framework, library, CDN, Google Fonts, icon library, gambar, atau emoji di UI.
- Tiga berkas: index.html, style.css, script.js. Semua di root repo dengan path relatif, supaya jalan di GitHub Pages dan saat dibuka langsung.
- script.js dimuat di akhir `<body>` dengan `<script src="script.js"></script>` (tanpa `type="module"`, tanpa import/export).
- Dilarang: class JavaScript, async/await, fetch, setTimeout/setInterval, `innerHTML` untuk data dari pengguna.
- Tidak boleh ada error di console saat aplikasi dipakai.

## 4. Struktur data (kontrak)
Dua array objek di localStorage, masing-masing dengan kuncinya sendiri: `'transaksi'` dan `'tagihan'`. Disimpan dengan JSON.stringify, dibaca dengan JSON.parse.

Satu transaksi:
```js
{
  id: 1739251200000,          // Date.now()
  tanggal: '2026-10-19',      // teks 'YYYY-MM-DD' dari input type="date"
  jenis: 'pemasukan',         // 'pemasukan' atau 'pengeluaran'
  kategori: 'Proyek',         // salah satu dari KATEGORI
  nominal: 500000,            // ANGKA, bukan teks berformat
  catatan: 'DP website klien A', // boleh kosong
  tagihanId: 1739250000000    // hanya ada kalau pemasukan ini berasal dari tagihan lunas
}
```

Satu tagihan:
```js
{
  id: 1739250000000,
  klien: 'Klien A',
  proyek: 'Website toko',
  nominal: 1500000,
  tanggal: '2026-10-12',
  status: 'belum dibayar'     // 'belum dibayar' atau 'lunas'
}
```

Daftar kategori tetap, satu sumber saja di script.js:
```js
const KATEGORI = ['Proyek', 'Peralatan', 'Software', 'Transportasi', 'Makan', 'Lainnya'];
```

Aturan data:
- id dibuat dengan `Date.now()`. Nominal selalu angka (konversi dengan `Number()` saat membaca input). Format Rupiah hanya saat ditampilkan, dengan `toLocaleString('id-ID')`.
- Tandai lunas: ubah status tagihan menjadi 'lunas', lalu tambahkan SATU transaksi pemasukan baru (kategori 'Proyek', nominal sama dengan tagihan, tanggal hari ini, catatan berisi nama klien dan proyek, dan `tagihanId`). Tagihan yang sudah lunas tidak bisa dilunaskan lagi (cegah pemasukan ganda).
- Hapus transaksi yang punya `tagihanId`: tagihan terkait kembali ke 'belum dibayar'.
- Hapus tagihan: hanya yang 'belum dibayar', dengan konfirmasi.
- Total piutang = jumlah nominal semua tagihan berstatus 'belum dibayar'.
- Ringkasan (pemasukan, pengeluaran, saldo) dihitung dari array transaksi saja, karena tagihan lunas sudah menjadi transaksi.
- Tanggal hari ini: `new Date().toISOString().slice(0, 10)`. Beri komentar satu baris bahwa ini memakai UTC (hanya bergeser antara 00:00 dan 07:00 WIB).

## 5. Fitur wajib
- **W1 Tambah transaksi:** form berisi tanggal, jenis (pemasukan/pengeluaran), kategori (select dari KATEGORI), nominal, catatan (opsional).
- **W2 Daftar transaksi:** dirender dari array lewat JavaScript (createElement), bukan ditulis di HTML. Terbaru di atas: urut berdasarkan tanggal terbaru, lalu id terbaru. Urutkan pada SALINAN array, karena `sort` mengubah array asli. Nominal dalam format Rupiah. Jenis tampil sebagai teks (jangan hanya warna).
- **W3 Hapus transaksi:** ada konfirmasi (`confirm()`) sebelum dihapus. Satu listener di wadah tabel dengan event delegation dan `closest()`.
- **W4 Data persisten:** data tetap ada setelah refresh atau browser ditutup. `muatData()` memakai try/catch, memeriksa hasil parse benar-benar array, dan jatuh ke `[]` kalau rusak.
- **W5 Ringkasan:** total pemasukan, total pengeluaran, saldo. Diperbarui otomatis setiap data berubah.
- **W6 Validasi:** nominal harus lebih dari 0 dan field wajib terisi. Pesan error tampil di elemen di halaman lewat `textContent` (bukan hanya `alert`), dan hilang saat input berhasil. Berlaku juga untuk form tagihan (klien, proyek, tanggal wajib; nominal lebih dari 0).
- **Fitur khas:** form tambah tagihan, daftar tagihan (klien, proyek, nominal, status), tombol "Tandai lunas" pada tagihan belum dibayar, tombol Hapus pada tagihan belum dibayar, dan kartu total piutang di ringkasan.

## 6. JavaScript
Fungsi wajib dengan nama ini: `simpanData()`, `muatData()`, `renderDaftar()`, `hitungRingkasan()`. Tambahan: `renderTagihan()`, `hitungPiutang()`, `tambahTransaksi()`, `hapusTransaksi()`, `tambahTagihan()`, `tandaiLunas()`, `hapusTagihan()`, `renderSemua()`. Satu fungsi satu tugas, kira-kira maksimal 20 baris.

Boleh dipakai:
- `const` secara default, `let` hanya kalau nilainya berubah. Selalu `===` dan `!==`.
- Array: `push`, `filter`, `map`, `forEach`, `reduce`, `some`, `find`. Total dihitung dengan `filter` + `reduce` (ini akan ditanyakan di ujian lisan).
- DOM: `querySelector`, `querySelectorAll`, `createElement`, `textContent`, `appendChild`, `addEventListener`, `className`, `dataset.id`. `wadah.innerHTML = ''` HANYA untuk mengosongkan sebelum render ulang. Data dari pengguna selalu lewat `textContent`.
- Event: "submit" + `event.preventDefault()`, `input.value`, delegasi lewat `event.target.closest(...)`.
- Template literal dan arrow function.

Pola state:
- Satu objek `state = { transaksi: [], tagihan: [] }` di memori.
- Setiap perubahan (tambah, hapus, lunas) mengikuti jalur yang sama: ubah state, `simpanData()`, `renderSemua(state)`. Tidak ada jalur lain yang mengubah tampilan.
- Fungsi render membaca dari ARGUMEN yang diterima, bukan dari variabel di luar.
- Kondisi kosong ditangani: "Belum ada transaksi." dan "Belum ada tagihan."

## 7. Dibuat mudah diubah (untuk "ubah langsung" tanpa AI)
Perubahan kecil yang mungkin diminta penguji harus bisa dilakukan dalam maksimal 3 baris:
- Tambah kategori baru: cukup tambah satu item di `KATEGORI`.
- Tampilkan jumlah transaksi: sediakan satu elemen di ringkasan yang diisi dari `state.transaksi.length`.
- Urutkan dari terlama: pengurutan hanya ada di SATU fungsi pembanding.
- Warna merah untuk pengeluaran: warna diatur lewat class `.pemasukan` dan `.pengeluaran` di CSS, bukan di JavaScript.
Jangan menyebar logika yang sama di banyak tempat.

## 8. Tampilan dan gaya kode
- Fungsional dan polos: satu warna aksen, latar polos, border 1px, tanpa gradient, bayangan tebal, animasi, atau hero banner.
- Semantik seperlunya: `<header>`, `<main>` (satu), `<section>` dengan heading, `<footer>`; satu `<h1>`; `<label for>` untuk setiap input; tabel dengan `<caption>`, `<thead>`, `<th scope="col">`.
- CSS: `* { box-sizing: border-box; }`, variabel warna di `:root`, satuan `rem`, Flexbox untuk baris sejajar, Grid untuk kartu ringkasan dan form dengan `repeat(auto-fit, minmax(..., 1fr))` dan `gap`. Tanpa `!important` dan tanpa style inline. Layout harus rapi di lebar 360px.
- Nama variabel dan fungsi bahasa Indonesia. Komentar sedikit, bahasa Indonesia santai, hanya untuk menjelaskan KENAPA. Tanpa banner komentar atau JSDoc.
- Target ukuran: index.html maks 120 baris, style.css maks 130, script.js maks 250.
- Teks UI datar dan jelas, tanpa slogan marketing.

## 9. Cara menjawab
Kerjakan bertahap. Setiap langkah, tampilkan KODE LENGKAP berkas yang berubah (jangan potongan dengan "..."), lalu berhenti dan tunggu saya bilang "lanjut".
- Langkah 1: index.html, style.css, script.js untuk struktur data, `KATEGORI`, `muatData()`/`simpanData()`, W1, W2, W4.
- Langkah 2: W3, W5, W6.
- Langkah 3: fitur khas (tagihan, tandai lunas, total piutang).
- Langkah berikutnya: hanya fitur bonus yang saya sebut.

Di akhir tiap langkah, tambahkan:
1. **Peta alur:** 3-5 baris, dari aksi pengguna sampai tampilan berubah, menyebut fungsi yang terlibat.
2. **Bahan AI-LOG:** ringkasan prompt saya dan nama fungsi atau bagian kode yang kamu tulis. JANGAN mengisi bagian "Diubah"; itu saya yang menulis. JANGAN mengarang bug atau kendala untuk PROSES.md.
3. **Tiga pertanyaan latihan lisan** tentang kode yang baru ditulis: satu "telusuri", satu "prediksi" (apa yang terjadi kalau satu baris dihapus atau diubah), satu "ubah langsung".
4. **Saran pesan commit** yang menjelaskan apa yang dikerjakan.

Sebelum mengirim, cek sendiri:
(1) tidak ada library, CDN, class, async, import/export;
(2) nominal disimpan sebagai angka;
(3) `muatData()` pakai try/catch dan pemeriksaan array;
(4) data pengguna tidak lewat `innerHTML`;
(5) render membaca argumen;
(6) tidak ada fitur di luar bagian 5 dan 10;
(7) tagihan tidak bisa dilunaskan dua kali.

## 10. Fitur bonus (hanya kalau saya minta)
Bonus hanya bernilai 3%, jadi kerjakan paling akhir, setelah semua wajib, README, AI-LOG, PROSES, dan GitHub Pages beres. Pilihan paling murah:
- Responsif 360px (sudah hampir otomatis dari bagian 8).
- Filter berdasarkan jenis dan kategori, plus pencarian pada catatan.
- Ekspor data ke file JSON, dan impor lewat `<textarea>` tempel.
