# AI-LOG

Catatan penggunaan AI selama hackathon. Isi dengan jujur dan sesuai kode. Log yang tidak cocok dengan kode mengurangi nilai; log yang jujur tidak.

Isi satu entri tiap kali AI menghasilkan kode. Tulis "Diubah" dengan kata-kata sendiri setelah membaca dan mencoba hasilnya.

---

## Persiapan: brief untuk AI
- Prompt: brief aturan stack dan struktur data yang saya siapkan bersama AI sebelum sesi (tanpa kode aplikasi). [isi tanggal/alat]
- Dipakai: aturan dan struktur data di brief sebagai instruksi untuk alat coding. [isi]
- Diubah: [isi: apa yang saya ubah atau putuskan sendiri dari brief itu]

## Langkah 1: [isi judul, mis. form tambah dan simpan ke localStorage]
- Prompt: [ringkas]
- Dipakai: [nama fungsi atau bagian kode]
- Diubah: [apa yang saya ubah atau perbaiki dari hasil AI, atau "tidak ada" kalau memang tidak ada]

## Langkah 2: [isi judul]
- Prompt:
- Dipakai:
- Diubah:

## Langkah 3: [isi judul, mis. fitur khas tagihan]
- Prompt:
- Dipakai:
- Diubah:

## Jatah harian (fitur khas)
- Prompt: “buat fungsi JS untuk menghitung sisa uang dibagi sisa hari di bulan ini”
- Dipakai: fungsi hitungJatahHarian() di app.js
- Diubah: hasil AI menghitung hari ini dua kali; rumus sisa hari saya perbaiki dan hasilnya dibulatkan ke bawah

--------------------------------
## Langkah 1 : Buat template
- Prompt: Buatkan template untuk Pengerjaan ETS
- Dipakai: untuk membuat pondasi awal pengerjaan
- Diubah: menyesuaikan keperluan

## Langkah 2 : fitur w1 -Kategori-
- Prompt: Maksud dari kategori dan implementasinya
- Dipakai: Untuk melengkapi W!
- Diubah: -

## Langkah 3: W2 daftar transaksi
- Prompt: Lengkapi render daftar transaksi dari array dan perbaiki form agar bisa menambahkan data untuk ditampilkan.
- Dipakai: Fungsi `renderDaftar()`, pembuatan baris tabel dengan `createElement`, dan handler form transaksi di `script.js`.
- Diubah: Periksa alur kode dan sesuaikan sendiri bila ada perubahan.

## Langkah 4: W3 hapus transaksi
- Prompt: Tambahkan tombol hapus dengan konfirmasi dan event delegation sesuai brief.
- Dipakai: Fungsi `hapusTransaksi()` dan `tanganiKlikHapus()` di `script.js`.
- Diubah: Periksa alur konfirmasi dan penghapusan sebelum digunakan.

## Langkah 5: W4 data persisten
- Prompt: Tambahkan pemuatan dan penyimpanan transaksi ke localStorage sesuai brief.
- Dipakai: Fungsi `muatData()`, `muatArray()`, dan `simpanData()` di `script.js`; perubahan tambah/hapus disimpan sebelum daftar dirender.
- Diubah: Periksa uji refresh dan kasus data localStorage rusak.

## Langkah 6: W5 ringkasan
- Prompt: Tambahkan ringkasan pemasukan, pengeluaran, dan saldo yang dihitung dari transaksi.
- Dipakai: Fungsi `hitungRingkasan()` di `script.js`, dipanggil saat render awal dan setelah data transaksi berubah.
- Diubah: Periksa hitungan dengan data pemasukan/pengeluaran yang berbeda.

## Langkah 7: Perbaikan W4 dan W6
- Prompt: Perbaiki validasi data tersimpan, pemulihan jika localStorage gagal, dan validasi form dengan pesan pada halaman.
- Dipakai: Fungsi validasi data, pemulihan penulisan `localStorage`, dan pemeriksaan submit di `script.js`; form menggunakan `novalidate` agar pesan W6 ditampilkan oleh aplikasi.
- Diubah: Uji data lokal normal/rusak, input tidak valid, dan penulisan localStorage yang gagal.
