// Mengambil elemen yang dibutuhkan
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const tombolReset = document.getElementById('reset-button')
const checkboxResetOtomatis = document.getElementById('checkbox-reset-otomatis')

// Set ukuran canvas
canvas.width = 600;
canvas.height = 400;

const warnaPlanet = {
    bumi: '#3B3B98',
    bulan: '#BDC3C7',
    mars: '#E74C3C',
    jupiter: '#F1C40F',
    neptunus: '#2980B9',
    venus: '#F5B041',
    matahari: '#FFA500'
}

// Set parameter awal
let gravitasi = 9.81;
const posisiAwal = 1;
const kecepatanAwal = 0;
let waktu = 0;
let posisi = posisiAwal;
let kecepatan = kecepatanAwal;
let warnaPlanetSekarang = warnaPlanet.bumi
let resetOtomatis = false;

function gambarBola() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, posisi, 10, 0, Math.PI * 2);
    ctx.fillStyle = warnaPlanetSekarang;
    ctx.fill();
    ctx.closePath();
}

function bersihkanCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function resetSimulasi() {
    tombolReset.style.display = 'none'
    waktu = 0;
    posisi = posisiAwal;
    kecepatan = kecepatanAwal;
    bersihkanCanvas();
    animasi();
}

function animasi() {
    bersihkanCanvas();
    gambarBola();

    // Perbarui posisi dan kecepatan berdasarkan waktu
    posisi = posisiAwal + kecepatanAwal * waktu + 0.5 * gravitasi * waktu ** 2;
    kecepatan = kecepatanAwal + gravitasi * waktu;
    waktu += 1 / 60;

    // Tampilkan nilai variabel di atas canvas
    ctx.font = "bold 13px Arial, sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Gravitasi: ${gravitasi.toFixed(2)} m / s²`, 10, 20);
    ctx.fillText(`Posisi awal: ${canvas.height.toFixed(2)} m`, 10, 40);
    ctx.fillText(`Waktu: ${waktu.toFixed(2)} s`, 10, 60);
    ctx.fillText(`Kecepatan: ${kecepatan.toFixed(2)} m / s`, 10, 80);

    // Hitung jarak antara bola dan ujung bawah canvas
    let jarak = canvas.height - posisi;
    ctx.fillText(`Jarak ke ujung bawah canvas: ${jarak.toFixed(2)} m`, 10, 100);

    // Meminta animasi frame berikutnya jika bola belum mencapai ujung bawah canvas
    if (posisi < canvas.height - 10) {
        requestAnimationFrame(animasi);
    } else {
        if (resetOtomatis) {
            resetSimulasi()
        } else {
            tombolReset.style.display = 'block';
        }
    }
}

// Tambahkan event listener pada select option
document.getElementById('planet').addEventListener('change', (e) => {

    const planet = e.target.value;
    switch (planet) {
        case 'bumi':
            gravitasi = 9.81;
            warnaPlanetSekarang = warnaPlanet.bumi;
            break;
        case 'bulan':
            gravitasi = 1.62;
            warnaPlanetSekarang = warnaPlanet.bulan;
            break;
        case 'mars':
            gravitasi = 3.71;
            warnaPlanetSekarang = warnaPlanet.mars;
            break;
        case 'jupiter':
            gravitasi = 24.79;
            warnaPlanetSekarang = warnaPlanet.jupiter;
            break;
        case 'neptunus':
            gravitasi = 11.15;
            warnaPlanetSekarang = warnaPlanet.neptunus;
            break;
        case 'venus':
            gravitasi = 8.87;
            warnaPlanetSekarang = warnaPlanet.venus;
            break;
        case 'matahari':
            gravitasi = 274;
            warnaPlanetSekarang = warnaPlanet.matahari;
            break;
    }

    resetSimulasi();
})

// Tambahkan event listener pada checkbox
checkboxResetOtomatis.addEventListener('change', (e) => {
    if (!(posisi < canvas.height - 10)) {
        resetSimulasi()
    }

    const isChecked = e.target.checked;
    if (isChecked) {
        resetOtomatis = true
    } else {
        resetOtomatis = false
    }
});


animasi();