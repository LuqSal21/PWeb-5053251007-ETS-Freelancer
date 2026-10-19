# Catatan Kas Freelancer

- **Nama / NRP:** Luqman / 5053251007
- **Persona:** Pekerja lepas (freelancer)
- **GitHub Pages:** https://luqsal21.github.io/PWeb-5053251007-ETS-Freelancer/

## Persona saya
Persona saya adalah pekerja lepas yang penghasilannya datang per proyek, bukan gaji tetap. Klien sering terlambat membayar, jadi uang yang sebenarnya sudah menjadi haknya masih tertahan dan sulit dibedakan dari saldo yang benar-benar ada. Aplikasi ini mencatat pemasukan, pengeluaran, dan tagihan klien supaya ia tahu saldo nyata dan total piutangnya.


## Fitur yang selesai
- [x] W1 Tambah transaksi
- [x] W2 Daftar transaksi
- [x] W3 Hapus transaksi dengan konfirmasi
- [x] W4 Data persisten (localStorage)
- [x] W5 Ringkasan (pemasukan, pengeluaran, saldo)
- [x] W6 Validasi form
- [x] Fitur khas: tagihan klien (belum dibayar / lunas)
- [x] Fitur khas: tagihan lunas otomatis menjadi pemasukan
- [x] Fitur khas: total piutang
- [ ] Bonus: Edit transaksi yang sudah tersimpan
- [ ] Bonus: Filter berdasarkan jenis, kategori, atau rentang tanggal, dan pencarian kata kunci pada catatan
- [ ] Bonus: Budget per kategori dengan peringatan saat mendekati atau melewati batas
- [ ] Bonus: Ekspor data ke file JSON dan impor kembali, sebagai backup
- [ ] Bonus: Tampilan responsif yang tetap rapi di layar HP selebar 360px


## Fitur yang belum selesai
Fitur yang belum selsesai adalah fitur bonus.
Untuk Filter hanya terbatas di Tipe dan deskripsi


## Catatan
- Data tersimpan di localStorage, jadi hanya ada di browser yang dipakai.
- Tagihan yang sudah lunas tidak bisa dilunaskan lagi. Kalau pemasukan hasil tagihan dihapus, tagihannya kembali ke "belum dibayar". Yang bisa dihapus langsung dari daftar tagihan hanya yang "belum dibayar".

## Berkas
- `index.html`: struktur halaman
- `style.css`: tampilan
- `script.js`: logika, state, dan penyimpanan
- `AI-LOG.md`: catatan penggunaan AI
- `PROSES.md`: persona, rancangan data, keputusan desain, bug
