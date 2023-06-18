/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const tombolReset = document.getElementById("reset-button");
const selectPlanet = document.getElementById("planet");
const checkboxResetOtomatis = document.getElementById(
  "checkbox-reset-otomatis"
  );
  const checkboxTampilkanSatuan = document.getElementById(
    "checkbox-tampilkan-satuan"
    );
    

canvas.width = 600;
canvas.height = 400;

class Planet {
  constructor(nama, warna, gravitasi, ukuran) {
    this.nama = nama;
    this.warna = warna;
    this.gravitasi = gravitasi;
    this.ukuran = ukuran;
  }
}

const backgroundImage = new Image();
backgroundImage.src = "public/space.png";

const generateRandom = (min = 0, max = 100) => {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
};

const generateRandomColorCode = () => {
  const letters = "0123456789ABCDEF";
  let colorCode = "#";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * 16);
    colorCode += letters[randomIndex];
  }
  return colorCode;
};

const dataPlanet = [
  new Planet("bumi", "#3B3B98", 9.81, 11.5),
  new Planet("bulan", "#BDC3C7", 1.62, 8),
  new Planet("mars", "#E74C3C", 3.72, 11),
  new Planet("jupiter", "#F1C40F", 24.79, 28),
  new Planet("neptunus", "#2980B9", 11.14, 20),
  new Planet("venus", "#F5B041", 8.87, 11),
  new Planet("matahari", "#FFA500", 272, 35),
  new Planet("merkurius", "#C0C0C0", 3.7, 10),
  new Planet("saturnus", "#FFD700", 10.43, 25),
  new Planet("uranus", "#7FFFD4", 8.87, 24),
  new Planet(
    "custom",
    generateRandomColorCode(),
    generateRandom(30, 50),
    generateRandom(20, 40)
  ),
];

const dataBumi = dataPlanet.find((value) => value.nama === "bumi");

const posisiAwal = 0;
const kecepatanAwal = 0;
const satuDetik = 1 / 60;
let gravitasi = dataBumi.gravitasi;
let ukuranPlanet = dataBumi.ukuran;
let waktu = 0;
let posisiCanvas = posisiAwal;
let posisiNyata = canvas.height;
let kecepatan = kecepatanAwal;
let warnaPlanetSekarang = dataBumi.warna;
let resetOtomatis = false;
let tamplikanSatuan = true;

const tambahWaktu = () => {
  waktu += satuDetik;
};

const hitungEstimasiWaktu = () => {
  const estimasiWaktu = Math.sqrt((2 * canvas.height) / gravitasi);
  return estimasiWaktu;
};

// Fungsi untuk menggambar latar belakang canvas
const gambarBackground = () => {
  // Menggambar dua lapis latar belakang yang saling berulang
  ctx.drawImage(backgroundImage, 0, -posisiCanvas, canvas.width, canvas.height);
  ctx.drawImage(
    backgroundImage,
    0,
    canvas.height - posisiCanvas - 1,
    canvas.width,
    canvas.height * 1.1
  );
};

// Fungsi untuk menggambar bola pada posisi tertentu
const gambarBola = (
  x = canvas.width / 2,
  y = posisiCanvas,
  radius = ukuranPlanet,
  sAngle = 0,
  eAngle = Math.PI * 2
) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, sAngle, eAngle);
  ctx.fillStyle = warnaPlanetSekarang;
  ctx.fill();
  ctx.closePath();
};

// Fungsi untuk membersihkan canvas
const bersihkanCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Fungsi untuk mereset simulasi
const resetSimulasi = () => {
  tombolReset.style.display = "none";
  waktu = 0;
  posisiCanvas = posisiAwal;
  posisiNyata = canvas.height;
  kecepatan = kecepatanAwal;
  animasi();
};

// Fungsi untuk menampilkan teks informasi
const menampilkanText = () => {
  // Mendapatkan nilai-nilai yang akan ditampilkan dalam teks
  const textGravitasi = gravitasi.toFixed(2);
  const textPosisiAwal = canvas.height.toFixed(2);
  const textWaktu = Math.floor(waktu);
  const textKecepatan = kecepatan.toFixed(2);
  const textPosisiBolaDiCanvas =
    posisiCanvas <= canvas.height
      ? posisiCanvas.toFixed(2)
      : Math.floor(posisiCanvas.toFixed(2));
  const textPosisiBolaDiNyata =
    posisiCanvas <= canvas.height
      ? posisiNyata.toFixed(2)
      : Math.ceil(posisiNyata.toFixed(2));
  const estimasiWaktu = hitungEstimasiWaktu();

  // Menampilkan teks informasi pada elemen HTML dan pada canvas
  document.getElementById(
    "posisi-setiap-saat-text"
  ).textContent = `Y(${textWaktu}) = (${textPosisiAwal}) - 1/2*(${textGravitasi})*(${textWaktu})^2 + (${kecepatanAwal})*(${waktu.toFixed(
    2
  )}) = ${textPosisiBolaDiNyata} m`;
  document.getElementById(
    "kecepatan-setiap-saat-text"
  ).textContent = `Vy(${textWaktu}) = (-${textGravitasi}) * (${textWaktu}) = ${textKecepatan} m / s`;

  ctx.font = "bold 13px Arial, sans-serif";
  ctx.fillStyle = "white";

  ctx.fillText(
    `Gravitasi ${tamplikanSatuan ? "(g)" : ""}: ${textGravitasi} m / s²`,
    10,
    20
  );
  ctx.fillText(
    `Posisi awal ${tamplikanSatuan ? "(Yo)" : ""}: ${textPosisiAwal} m`,
    10,
    40
  );
  ctx.fillText(`Waktu ${tamplikanSatuan ? "(t)" : ""}: ${textWaktu} s`, 10, 60);
  ctx.fillText(
    `Kecepatan ${tamplikanSatuan ? "(Vy)" : ""}: ${textKecepatan} m / s`,
    10,
    80
  );
  ctx.fillText(
    `Posisi bola di canvas ${
      tamplikanSatuan ? "(yc)" : ""
    }: ${textPosisiBolaDiCanvas} m`,
    10,
    100
  );
  ctx.fillText(
    `Posisi bola di dunia nyata ${
      tamplikanSatuan ? "(y)" : ""
    }: ${textPosisiBolaDiNyata} m`,
    10,
    120
  );
  ctx.fillText(`Estimasi waktu jatuh: ${Math.floor(estimasiWaktu)} s`, 10, 140);
};

// Fungsi untuk menghitung posisi bola pada setiap waktu
const menghitungPosisi = () => {
  //  Rumus di ubah menjadi + karena titik 0 pad sumbu Y canvas dimulai dari atas
  posisiCanvas =
    posisiAwal + 0.5 * gravitasi * Math.pow(waktu, 2) + kecepatanAwal * waktu;
  posisiNyata = canvas.height - posisiCanvas;
};

// Fungsi untuk menghitung kecepatan bola pada setiap waktu
const menghitungKecepatan = () => {
  kecepatan = -gravitasi * waktu;
};

// Fungsi untuk menonaktifkan input pengguna selama animasi berjalan
const disableInput = () => {
  selectPlanet.disabled = true;
  document.getElementById("edit-button").disabled = true;
};

// Fungsi untuk mengaktifkan input pengguna setelah animasi selesai
const enableInput = () => {
  tombolReset.style.display = "block";
  selectPlanet.disabled = false;
  document.getElementById("edit-button").disabled = false;
};

// Fungsi utama untuk menganimasikan simulasi jatuh bebas
const animasi = () => {
  bersihkanCanvas();
  gambarBackground();
  menghitungPosisi();
  menghitungKecepatan();
  gambarBola();
  tambahWaktu();
  menampilkanText();
  if (posisiCanvas < canvas.height) {
    disableInput();
    requestAnimationFrame(animasi);
  } else {
    if (resetOtomatis) {
      resetSimulasi();
    } else {
      enableInput();
    }
  }
};

// Callback saat gambar latar belakang selesai dimuat
backgroundImage.onload = function () {
  animasi();
};
