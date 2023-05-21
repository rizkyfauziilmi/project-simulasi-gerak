// Mengambil elemen yang dibutuhkan
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
const backgroundImage = new Image();
backgroundImage.src = "public/space.png";

// Set ukuran canvas
canvas.width = 600;
canvas.height = 400;

// Set data planet
const dataPlanet = [
  new Planet("bumi", "#3B3B98", 9.81),
  new Planet("bulan", "#BDC3C7", 1.62),
  new Planet("mars", "#E74C3C", 3.72),
  new Planet("jupiter", "#F1C40F", 24.79),
  new Planet("neptunus", "#2980B9", 11.15),
  new Planet("venus", "#F5B041", 8.87),
  new Planet("matahari", "#FFA500", 274),
  new Planet("merkurius", "#C0C0C0", 3.7),
  new Planet("saturnus", "#FFD700", 10.44),
  new Planet("uranus", "#7FFFD4", 8.87),
];

// Mendapatkan data bumi untuk initial value
const dataBumi = dataPlanet.filter((value) => value.nama === "bumi")[0];

// Set variable awal
const posisiAwal = 0;
const kecepatanAwal = 0;
let gravitasi = dataBumi.gravitasi;
let waktu = 0;
let posisiCanvas = posisiAwal;
let posisiNyata = canvas.height;
let kecepatan = kecepatanAwal;
let warnaPlanetSekarang = dataBumi.warna;
let resetOtomatis = false;
let tamplikanSatuan = true;

// Fungsi Menggambar Background
const gambarBackground = () => {
  ctx.drawImage(backgroundImage, 0, -posisiCanvas, canvas.width, canvas.height);
  ctx.drawImage(
    backgroundImage,
    0,
    canvas.height - posisiCanvas - 1,
    canvas.width,
    canvas.height * 1.1
  );
};

// Fungsi Menggambar Bola
const gambarBola = () => {
  ctx.beginPath();
  ctx.arc(canvas.width / 2, posisiCanvas, 10, 0, Math.PI * 2);
  ctx.fillStyle = warnaPlanetSekarang;
  ctx.fill();
  ctx.closePath();
};

// Fungsi Membersihkan Canvas
const bersihkanCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gambarBackground();
};

// Fungsi Reset Simulasi
const resetSimulasi = () => {
  tombolReset.style.display = "none";
  waktu = 0;
  posisiCanvas = posisiAwal;
  posisiNyata = canvas.height;
  kecepatan = kecepatanAwal;
  bersihkanCanvas();
  animasi();
};

// Fungsi Menampilkan Text
const menampilkanText = () => {
  // Variable text
  const textGravitasi = gravitasi.toFixed(2);
  const textPosisiAwal = canvas.height.toFixed(2);
  const textWaktu = waktu.toFixed(2);
  const textKecepatan = kecepatan.toFixed(2);
  const textPosisiBolaDiCanvas =
    posisiCanvas <= canvas.height
      ? posisiCanvas.toFixed(2)
      : Math.floor(posisiCanvas.toFixed(2));
  const textPosisiBolaDiNyata =
    posisiCanvas <= canvas.height
      ? posisiNyata.toFixed(2)
      : Math.ceil(posisiNyata.toFixed(2));

  // Detail Perhitungan
  document.getElementById(
    "posisi-setiap-saat-text"
  ).textContent = `Y(${textWaktu}) = (${textPosisiAwal}) - 1/2*(${textGravitasi})*(${textWaktu})^2 + (${kecepatanAwal})*(${waktu.toFixed(
    2
  )}) = ${
    posisiCanvas <= canvas.height
      ? posisiNyata.toFixed(2)
      : Math.ceil(posisiNyata.toFixed(2))
  } m`;
  document.getElementById(
    "kecepatan-setiap-saat-text"
  ).textContent = `Vy(${textWaktu}) = (-${textGravitasi}) * (${textWaktu}) = ${textKecepatan} m / s`;

  // Tampilkan nilai variabel di atas canvas
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

  ctx.fillText(`Waktu ${tamplikanSatuan ? "(t)" : ""}: ${textWaktu} s`, 10, 80);

  ctx.fillText(
    `Kecepatan ${
      tamplikanSatuan ? `Vy(${textWaktu})` : ""
    }: ${textKecepatan} m / s`,
    10,
    60
  );

  // * membulatkan nilai untuk mengatasi border canvas
  ctx.fillText(
    `Posisi bola di dalam canvas: ${textPosisiBolaDiCanvas} m`,
    10,
    100
  );

  ctx.fillText(
    `Posisi bola di dunia nyata ${
      tamplikanSatuan ? `Y(${waktu.toFixed(2)})` : ""
    }: ${textPosisiBolaDiNyata} m`,
    10,
    120
  );
};

// Fungsi Menghitung Posisi Setiap Saat
const menghitungPosisi = () => {
  // menghitung posisi bola di canvas
  //* rumus menjadi + karena dalam canvas bagian paling atas dimulai dari 0
  posisiCanvas =
    posisiAwal + 0.5 * gravitasi * waktu ** 2 + kecepatanAwal * waktu;

  // menghitung posisi bola di dunia nyata
  posisiNyata = canvas.height - posisiCanvas;
};

// Menghitung Kecepatan Setiap Saat
const menghitungKecepatan = () => {
  kecepatan = Math.abs(-gravitasi * waktu);
};

// Fungsi Animasi
const animasi = () => {
  bersihkanCanvas();

  gambarBackground();

  gambarBola();

  // Perbarui posisi dan kecepatan berdasarkan waktu
  menghitungPosisi();
  menghitungKecepatan();

  // Increment waktu
  waktu += 1 / 60;

  menampilkanText();

  // Meminta frame berikutnya jika bola belum mencapai ujung bawah canvas
  if (posisiCanvas < canvas.height) {
    //! DO NOT delete: important code to prevent bug
    selectPlanet.disabled = true;

    selectPlanet.style.opacity = 0.5;

    requestAnimationFrame(animasi);
  } else {
    if (resetOtomatis) {
      resetSimulasi();
    } else {
      tombolReset.style.display = "block";
      selectPlanet.disabled = false;
      selectPlanet.style.opacity = 1;
    }
  }
};

// panggil fungsi animasi jika background sudah ter-load
backgroundImage.onload = function () {
  animasi();
};
