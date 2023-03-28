// Mengambil elemen yang dibutuhkan
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const tombolReset = document.getElementById('reset-button')
const checkboxResetOtomatis = document.getElementById('checkbox-reset-otomatis')

// Set ukuran canvas
canvas.width = 600;
canvas.height = 400;

// Set data planet
const dataPlanet = [
    {
        nama: "bumi",
        warna: '#3B3B98',
        gravitasi: 9.81
    },
    {
        nama: "bulan",
        warna: '#BDC3C7',
        gravitasi: 1.62
    },
    {
        nama: "mars",
        warna: '#E74C3C',
        gravitasi: 3.72
    },
    {
        nama: "jupiter",
        warna: '#F1C40F',
        gravitasi: 24.79
    },
    {
        nama: "neptunus",
        warna: '#2980B9',
        gravitasi: 11.15
    },
    {
        nama: "venus",
        warna: '#F5B041',
        gravitasi: 8.87
    },
    {
        nama: "matahari",
        warna: '#FFA500',
        gravitasi: 274
    },
    {
        nama: "merkurius",
        warna: '#C0C0C0',
        gravitasi: 3.7
    },
    {
        nama: "saturnus",
        warna: '#FFD700',
        gravitasi: 10.44
    },
    {
        nama: "uranus",
        warna: '#7FFFD4',
        gravitasi: 8.87
    },
]

// Mendapatkan data bumi untuk initial value 
const dataBumi = dataPlanet.filter((value) => value.nama === "bumi")[0]

// Set variable awal
const posisiAwal = 0;
const kecepatanAwal = 0;
let gravitasi = dataBumi.gravitasi;
let waktu = 0;
let posisiCanvas = posisiAwal;
let posisiNyata = posisiAwal;
let kecepatan = kecepatanAwal;
let warnaPlanetSekarang = dataBumi.warna;
let resetOtomatis = false;

const gambarBola = () => {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, posisiCanvas, 10, 0, Math.PI * 2);
    ctx.fillStyle = warnaPlanetSekarang;
    ctx.fill();
    ctx.closePath();
}

const bersihkanCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const resetSimulasi = () => {
    tombolReset.style.display = 'none'
    waktu = 0;
    posisiCanvas = posisiAwal;
    kecepatan = kecepatanAwal;
    bersihkanCanvas();
    animasi();
}

const menampilkanText = () => {

    // Tampilkan nilai variabel di atas canvas
    ctx.font = "bold 13px Arial, sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Gravitasi (g): ${gravitasi.toFixed(2)} m / s²`, 10, 20);
    ctx.fillText(`Posisi awal (Yo): ${canvas.height.toFixed(2)} m`, 10, 40);
    ctx.fillText(`Waktu (t): ${waktu.toFixed(2)} s`, 10, 80);
    ctx.fillText(`Kecepatan Vy(${waktu.toFixed(1)}): ${kecepatan.toFixed(2)} m / s`, 10, 60);
    ctx.fillText(`Posisi bola di dalam canvas: ${posisiCanvas.toFixed(2)} m`, 10, 100);
    ctx.fillText(`Posisi bola di dunia nyata Y(${waktu.toFixed(1)}): ${posisiNyata.toFixed(2)} m`, 10, 120);
}

const menghitungPosisi = () => {
    // menghitung posisi bola di canvas
    //* rumus menjadi + karena dalam canvas bagian paling atas dimulai dari 0
    posisiCanvas = posisiAwal + (0.5 * gravitasi * waktu ** 2) + (kecepatanAwal * waktu); 

    // menghitung posisi bola di dunia nyata
    posisiNyata = canvas.height - posisiCanvas;
}

const menghitungKecepatan = () => {
    kecepatan = Math.abs(-gravitasi * waktu); 
}

const animasi = () => {

    bersihkanCanvas();

    gambarBola();

    // Perbarui posisi dan kecepatan berdasarkan waktu
    menghitungPosisi();
    menghitungKecepatan();

    // Increment waktu
    waktu += 1 / 60;

    menampilkanText()

    // Meminta animasi frame berikutnya jika bola belum mencapai ujung bawah canvas
    if (posisiCanvas < canvas.height) {
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

    dataPlanet.map((value) => {
        if (value.nama === planet) {
            gravitasi = value.gravitasi;
            warnaPlanetSekarang = value.warna
            resetSimulasi();
        }
    })
})

// Tambahkan event listener pada checkbox
checkboxResetOtomatis.addEventListener('change', (e) => {
    // jika user mengganti nilai checkbox saat bola sudah mengenai canvas dan reset otamatis tidak nyala maka akan reset simulasi
    if (!(posisiCanvas < canvas.height) && !resetOtomatis) {
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