# PROSES

Tulis dengan kata-kata sendiri. Bagian ini jadi bahan utama evaluasi lisan.

## Persona dan masalahnya
Saya mendapat persona pekerja lepas. Penghasilannya datang per proyek, dan klien sering terlambat membayar. Akibatnya ia sulit tahu berapa saldo yang benar-benar dipegang dan berapa uang yang masih harus ditagih.

## Rancangan struktur data
Rancangan ini saya susun sebelum mulai menulis kode (lewat brief yang saya siapkan bersama AI), lalu saya terapkan tanpa mengubah bentuk datanya. Ada dua array objek di localStorage dengan kunci masing-masing: `transaksi` dan `tagihan`.

```js
// transaksi
{ id, tanggal: '2026-10-19', jenis: 'pemasukan' | 'pengeluaran', kategori, nominal: 500000, catatan, tagihanId }
// tagihan
{ id, klien, proyek, nominal, tanggal, status: 'belum dibayar' | 'lunas' }
```
 
- `id` dari `Date.now()`; `nominal` disimpan sebagai angka, bukan teks berformat Rupiah.
- `tagihanId` hanya ada di pemasukan yang berasal dari tagihan lunas.
- Daftar kategori tetap ada di satu array `KATEGORI` di `script.js`.

Dua array terpisah karena tagihan dan transaksi punya isian yang berbeda. Nominal berupa angka supaya bisa dijumlahkan dengan `reduce`; kalau berupa teks "Rp 25.000", penjumlahan jadi salah.

## Satu keputusan desain beserta alasannya
**Tagihan yang dilunasi membuat transaksi pemasukan baru, bukan hanya mengubah status.**
- [DRAF - alasan, tulis ulang dengan kata-kata sendiri] Ringkasan (pemasukan, pengeluaran, saldo) hanya menghitung dari array `transaksi`, jadi uang dari tagihan harus masuk ke sana agar saldo benar. Dengan begitu fitur khas memakai data transaksi yang sama, bukan data terpisah.
- Akibatnya, data harus dijaga konsisten: tagihan yang sudah lunas tidak bisa dilunaskan dua kali, dan kalau pemasukan hasil tagihan dihapus, tagihannya kembali ke "belum dibayar".

## Bug atau kendala (minimal dua)

### 1. Data hilang saat halaman di-refresh
- Gejala: setelah W1-W3 selesai, transaksi yang saya tambahkan tampil di tabel, tetapi semuanya hilang saat halaman di-refresh.
- Cara menemukan penyebabnya: saya menambah transaksi, lalu refresh, dan daftarnya kosong lagi. Ternyata transaksi hanya tersimpan di variabel `state` di memori JavaScript, yang dibuat ulang setiap halaman dimuat.
- Cara mengatasi: saya menambahkan penyimpanan ke localStorage (W4). `simpanData()` menyimpan dengan `JSON.stringify` setiap kali data berubah, dan `muatData()` membacanya kembali dengan `JSON.parse` di dalam `try/catch` saat halaman dibuka.

### 2. Tampilan yang kurang enak dipandang
- Gejala: Ukuran kotak "Tambah transaksi" tidak sama dengan kotak lainnya. Kotak ini cuma selebar sekitar sepertiga halaman dan menyisakan ruang kosong di sebelah kanan, sedangkan kotak ringkasan, tagihan, dan daftar transaksi selebar penuh. Akibatnya tampilan terlihat tidak rata.
- Cara menemukan penyebabnya: Saya buka halaman lewat Live Server, lalu klik kanan pada kotak tersebut dan pilih Inspect untuk melihat ukurannya. Kotak "Tambah transaksi" ternyata berada di dalam `<div class="area-transaksi">`, dan di style.css div itu memakai `display: grid` dengan `grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr))`. Dengan aturan itu, lebar halaman dibagi menjadi beberapa kolom, dan form hanya menempati satu kolom. Sementara itu, kotak daftar transaksi punya `grid-column: 1 / -1`, jadi ia selebar penuh. Karena itulah ukurannya berbeda.
- Cara mengatasi: Ubah code pada style.css, yaitu hapus aturan grid pada `.area-transaksi` (beserta aturan `grid-column` pada kotak daftar). Tanpa grid, kotak form dan kotak daftar tersusun ke bawah seperti `section` lainnya, jadi lebarnya sama dengan kotak-kotak lain. Isi form tetap berjajar rapi karena `form` sendiri sudah memakai grid `auto-fit`. Setelah itu saya refresh dan cek lagi, lalu coba perkecil jendela sampai 360px untuk memastikan kotaknya tetap pas.

## Catatan checkpoint
- Checkpoint 1 (16.16-16.34): commit `a3fa221`, `a7512ef`, `8422b63` untuk W1, W2, W3.
- Checkpoint 2 (17.03): commit `1321522` berisi W4, W5, dan W6 (penyimpanan, ringkasan, validasi). Pesan commitnya "test: memastikan setiap fitur berjalan sesuai fungsinya" tidak menggambarkan isinya.
- Checkpoint 3 (17.21 dan 17.35): commit `978e310` berisi fitur khas tagihan beserta CSS awal (pesannya hanya "feat: css"), lalu `5945a1f` merapikan CSS. 
- Dan 2 commit terakhir adalah untuk Docs README.md dan PROSES.md
