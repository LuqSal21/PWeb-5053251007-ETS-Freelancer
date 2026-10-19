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

### 1. [judul singkat]
- Gejala:
- Cara menemukan penyebabnya:
- Cara mengatasi:

### 2. Tampilan yag kurang enak dipandang
- Gejala: Box 
- Cara menemukan penyebabnya:
- Cara mengatasi:

## Catatan checkpoint
- Checkpoint 1 (16.16-16.34): commit `a3fa221`, `a7512ef`, `8422b63` untuk W1, W2, W3.
- Checkpoint 2 (17.03): commit `1321522` berisi W4, W5, dan W6 (penyimpanan, ringkasan, validasi). Pesan commitnya "test: memastikan setiap fitur berjalan sesuai fungsinya" tidak menggambarkan isinya.
- Checkpoint 3 (17.21 dan 17.35): commit `978e310` berisi fitur khas tagihan beserta CSS awal (pesannya hanya "feat: css"), lalu `5945a1f` merapikan CSS. 
- Dan 2 commit terakhir adalah untuk Docs README.md dan PROSES.md
