    const KATEGORI = [
    'Proyek',
    'Peralatan',
    'Software',
    'Transportasi',
    'Makan',
    'Lainnya'
    ];

    let state;
    const pilihKategori = document.querySelector('#kategori');
    const formTransaksi = document.querySelector('#form-transaksi');
    const pesanForm = document.querySelector('#pesan-form');
    const isiTabel = document.querySelector('#isi-tabel');
    const pesanKosong = document.querySelector('#pesan-kosong');
    const saldo = document.querySelector('#saldo');
    const totalMasuk = document.querySelector('#total-masuk');
    const totalKeluar = document.querySelector('#total-keluar');

    function formatRupiah(nominal) {
    return 'Rp ' + nominal.toLocaleString('id-ID');
    }

    function tanggalValid(tanggal) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggal)) {
        return false;
    }
    const nilaiTanggal = new Date(tanggal + 'T00:00:00Z');
    return !Number.isNaN(nilaiTanggal.getTime())
        && nilaiTanggal.toISOString().slice(0, 10) === tanggal;
    }

    function transaksiValid(item) {
    return item !== null
        && typeof item === 'object'
        && Number.isSafeInteger(item.id)
        && tanggalValid(item.tanggal)
        && (item.jenis === 'pemasukan' || item.jenis === 'pengeluaran')
        && KATEGORI.some(function (kategori) { return kategori === item.kategori; })
        && Number.isFinite(item.nominal)
        && item.nominal > 0
        && typeof item.catatan === 'string'
        && (item.tagihanId === undefined || Number.isSafeInteger(item.tagihanId));
    }

    function tagihanValid(item) {
    return item !== null
        && typeof item === 'object'
        && Number.isSafeInteger(item.id)
        && typeof item.klien === 'string'
        && item.klien.trim() !== ''
        && typeof item.proyek === 'string'
        && item.proyek.trim() !== ''
        && Number.isFinite(item.nominal)
        && item.nominal > 0
        && tanggalValid(item.tanggal)
        && (item.status === 'belum dibayar' || item.status === 'lunas');
    }

    function muatArray(kunci, validasiItem) {
    try {
        const data = localStorage.getItem(kunci);
        const hasil = data === null ? [] : JSON.parse(data);
        if (!Array.isArray(hasil) || !hasil.every(validasiItem)) {
        console.warn('Data ' + kunci + ' tidak valid; data direset.');
        return [];
        }
        return hasil;
    } catch (error) {
        console.warn('Data ' + kunci + ' rusak atau tidak dapat dibaca; data direset.', error);
        return [];
    }
    }

    function muatData() {
    return {
        transaksi: muatArray('transaksi', transaksiValid),
        tagihan: muatArray('tagihan', tagihanValid)
    };
    }

    function simpanData() {
    const kunci = ['transaksi', 'tagihan'];
    const dataBaru = [JSON.stringify(state.transaksi), JSON.stringify(state.tagihan)];
    const dataLama = [];
    const berhasilDitulis = [];
    try {
        kunci.forEach(function (nama) {
        dataLama.push(localStorage.getItem(nama));
        });
        kunci.forEach(function (nama, indeks) {
        if (dataLama[indeks] !== dataBaru[indeks]) {
            localStorage.setItem(nama, dataBaru[indeks]);
            berhasilDitulis.push(indeks);
        }
        });
        return true;
    } catch (error) {
        console.error('Data gagal disimpan ke localStorage.', error);
        let pemulihanGagal = false;
        berhasilDitulis.reverse().forEach(function (indeks) {
        try {
            if (dataLama[indeks] === null) {
            localStorage.removeItem(kunci[indeks]);
            } else {
            localStorage.setItem(kunci[indeks], dataLama[indeks]);
            }
        } catch (errorPemulihan) {
            pemulihanGagal = true;
            console.error('Pemulihan data ' + kunci[indeks] + ' gagal.', errorPemulihan);
        }
        });
        pesanForm.textContent = pemulihanGagal
        ? 'Penyimpanan gagal dan data lama tidak dapat dipulihkan. Periksa localStorage.'
        : 'Data gagal disimpan. Perubahan dibatalkan.';
        return false;
    }
    }

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
    const aksi = document.createElement('td');
    const tombolHapus = document.createElement('button');
    baris.appendChild(buatSel(item.tanggal));
    baris.appendChild(buatSel(catatan));
    baris.appendChild(buatSel(item.kategori));
    baris.appendChild(buatSel(item.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'));
    baris.appendChild(buatSel(formatRupiah(item.nominal)));
    tombolHapus.type = 'button';
    tombolHapus.textContent = 'Hapus';
    tombolHapus.dataset.id = item.id;
    aksi.appendChild(tombolHapus);
    baris.appendChild(aksi);
    return baris;
    }

    function hapusTransaksi(id) {
    const yakin = confirm('Yakin ingin menghapus transaksi ini?');
    if (!yakin) {
        return;
    }
    const transaksiSebelumnya = state.transaksi;
    state.transaksi = state.transaksi.filter(function (item) {
        return item.id !== id;
    });
    if (!simpanData()) {
        state.transaksi = transaksiSebelumnya;
        return;
    }
    renderSemua(state);
    }

    function renderDaftar(data) {
    isiTabel.innerHTML = '';
    const transaksiTerbaru = [...data.transaksi].sort(function (a, b) {
        return b.tanggal.localeCompare(a.tanggal) || b.id - a.id;
    });
    transaksiTerbaru.forEach(function (item) {
        isiTabel.appendChild(buatBaris(item));
    });
    pesanKosong.textContent = transaksiTerbaru.length === 0
        ? 'Belum ada transaksi.'
        : '';
    }

    function tanganiKlikHapus(event) {
    const tombol = event.target.closest('button[data-id]');
    if (tombol) {
        hapusTransaksi(Number(tombol.dataset.id));
    }
    }

    function tambahTransaksi(event) {
    event.preventDefault();
    const nominal = Number(document.querySelector('#jumlah').value);
    const tanggal = document.querySelector('#tanggal').value;
    const kategori = pilihKategori.value;
    const jenis = document.querySelector('#tipe').value;
    if (!Number.isFinite(nominal) || nominal <= 0) {
        pesanForm.textContent = 'Nominal harus lebih dari 0.';
        return;
    }
    if (!tanggalValid(tanggal)) {
        pesanForm.textContent = 'Tanggal wajib diisi dengan benar.';
        return;
    }
    if (!KATEGORI.some(function (item) { return item === kategori; })) {
        pesanForm.textContent = 'Pilih kategori transaksi.';
        return;
    }
    if (jenis !== 'pemasukan' && jenis !== 'pengeluaran') {
        pesanForm.textContent = 'Pilih jenis transaksi.';
        return;
    }
    const item = {
        id: Date.now(),
        tanggal: tanggal,
        jenis: jenis,
        kategori: kategori,
        nominal: nominal,
        catatan: document.querySelector('#deskripsi').value.trim()
    };
    state.transaksi.push(item);
    if (!simpanData()) {
        state.transaksi.pop();
        return;
    }
    pesanForm.textContent = '';
    formTransaksi.reset();
    renderSemua(state);
    }

    function hitungRingkasan(data) {
    const pemasukan = data.transaksi.filter(function (item) {
        return item.jenis === 'pemasukan';
    }).reduce(function (total, item) {
        return total + item.nominal;
    }, 0);
    const pengeluaran = data.transaksi.filter(function (item) {
        return item.jenis === 'pengeluaran';
    }).reduce(function (total, item) {
        return total + item.nominal;
    }, 0);
    totalMasuk.textContent = formatRupiah(pemasukan);
    totalKeluar.textContent = formatRupiah(pengeluaran);
    saldo.textContent = formatRupiah(pemasukan - pengeluaran);
    }

    function renderSemua(data) {
    renderDaftar(data);
    hitungRingkasan(data);
    }

    state = muatData();
    formTransaksi.addEventListener('submit', tambahTransaksi);
    isiTabel.addEventListener('click', tanganiKlikHapus);
    renderSemua(state);