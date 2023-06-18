/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas-gerak-parabola");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight / 1.5;

// set background
const backgroundImage = new Image();
backgroundImage.src = "../../public/park.jpg";


const radiansToDegrees = (radians) => {
  return radians * (180 / Math.PI);
}

const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
}

const xAwal = 0;
const yAwal = 0;
let gravitasi = 10;
let kecepatanAwal = 250;
let elevasi = degreesToRadians(37);
let satuDetik = (1 / 60) * 2;
let vox = Math.round(kecepatanAwal * Math.cos(elevasi));
let voy = Math.round(kecepatanAwal * Math.sin(elevasi));
let waktu = 0;
let path = false;
let x = 0;
let y = 0;

setInterval(() => {
  path = true;
}, 500);

// Fungsi untuk menggambar latar belakang pada canvas
const gambarBackground = () => {
  ctx.globalAlpha = 1; // Mengatur nilai transparansi global menjadi 1 (tidak transparan)
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Menggambar gambar latar belakang pada canvas menggunakan metode drawImage
};

const convertToRealScala = (koordinat) => {
  return koordinat * 5;
};

const tambahWaktu = () => {
  waktu += satuDetik;
};

// Array untuk menyimpan posisi bola sebelumnya
let posisiBolaSebelumnya = [];

// Fungsi untuk menggambar jejak bola pada canvas
const gambarJejakBola = (warna = "white") => {
  ctx.globalAlpha = 0.3; // Mengatur nilai transparansi global menjadi 0.3 (semi-transparan)

  // Memanggil fungsi gambarBola untuk setiap posisi bola di Array posisiBolaSebelumnya[]
  for (let i = 1; i < posisiBolaSebelumnya.length; i++) {
    gambarBola(
      posisiBolaSebelumnya[i].x,
      posisiBolaSebelumnya[i].y,
      warna,
      false
    ); 
  }
  path = false; // Mengatur variabel path menjadi false
};

const gambarBola = (
  xCanvas = x,
  yCanvas = canvas.height - y,
  warna = "red",
  main = false
) => {
  ctx.beginPath();
  ctx.arc(xCanvas, yCanvas, 10, 0, Math.PI * 2);
  ctx.fillStyle = warna;
  ctx.fill();
  ctx.closePath();

  if (main && path) { // jika fungsi gambarBola di panggil di dalam fungsi utama "animasi"
    // Menambahkan posisi bola ke array posisiBolaSebelumnya
    posisiBolaSebelumnya.push({ x: xCanvas, y: yCanvas });
  }
};

const bersihkanCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Fungsi untuk menghitung nilai x berdasarkan waktu t
const hitungX = (t = waktu) => {
  let x = xAwal + vox * t; // Menghitung nilai x dengan rumus xAwal + vox * t
  x /= 5; // Membagi nilai x dengan 5
  return Math.round(x); // Mengembalikan nilai x yang telah dibulatkan
};

// Fungsi untuk menghitung nilai y berdasarkan waktu t
const hitungY = (t = waktu) => {
  let y = yAwal - (1 / 2) * gravitasi * Math.pow(t, 2) + voy * t; // Menghitung nilai y dengan rumus yAwal - (1/2) * gravitasi * t^2 + voy * t
  y /= 5; // Membagi nilai y dengan 5 untuk skala 1:5
  if (y < 0) {
    // Memeriksa apakah nilai y kurang dari 0
    y = 0; // Jika iya, maka nilai y diubah menjadi 0
  }
  return Math.round(y); // Mengembalikan nilai y yang telah dibulatkan
};

const hitungWaktuMax = () => {
  return Math.round((kecepatanAwal * Math.sin(elevasi)) / gravitasi);
};

// Fungsi untuk menampilkan tinggi maksimum pada canvas
const tinggiMaksimum = () => {
  const tMax = hitungWaktuMax(); // Menghitung waktu tinggi maksimum dengan memanggil fungsi hitungWaktuMax()
  const xMax = hitungX(tMax); // Menghitung nilai x pada waktu maksimum dengan memanggil fungsi hitungX(tMax)
  const yMax = hitungY(tMax); // Menghitung nilai y pada waktu maksimum dengan memanggil fungsi hitungY(tMax)

  // Mengatur gaya garis putus-putus
  ctx.setLineDash([5, 3]); // Mengatur pola garis putus-putus

  // Mengatur warna garis
  ctx.strokeStyle = "white"; // Mengatur warna garis menjadi putih

  // Menggambar garis putus-putus vertikal
  ctx.beginPath();
  ctx.moveTo(xMax, canvas.height - yMax); // Mengatur koordinat awal garis
  ctx.lineTo(xMax, canvas.height); // Mengatur koordinat akhir garis
  ctx.stroke(); // Menggambar garis

  // Menampilkan nilai variabel di atas canvas
  ctx.fillStyle = waktu >= tMax ? "yellow" : "white"; // Mengatur warna teks menjadi kuning jika waktu sekarang sudah menempuh waktu tinggi maksimum
  ctx.fillText(
    `Tinggi Maksimum ${convertToRealScala(
      yMax
    )} m dengan waktu tempuh ${tMax}s`,
    xMax + 10,
    canvas.height - yMax + yMax / 2
  );

  // Memanggil fungsi gambarBola untuk menggambar bola pada posisi xMax, canvas.height - yMax dengan warna kuning
  gambarBola(xMax, canvas.height - yMax, "yellow");
};

// Fungsi untuk menampilkan detail teks pada canvas
const textDetail = () => {
  ctx.globalAlpha = 1.0; // Mengatur nilai transparansi global menjadi 1 (tidak transparan)
  ctx.font = "bold 13px Arial, sans-serif"; // Mengatur properti font untuk teks
  ctx.fillStyle = "white"; // Mengatur warna isi teks menjadi putih

  // Menampilkan teks "skala 1 : 5" pada posisi canvas.width - 80, 25
  ctx.fillText("skala 1 : 5", canvas.width - 80, 25);

  // Menampilkan teks "Waktu = ..." pada posisi 10, 20
  ctx.fillText(`Waktu = ${Math.round(waktu)}s`, 10, 20);

  // Menampilkan teks "Elevasi = ..." pada posisi 10, 40
  ctx.fillText(
    `Elevasi = ${Math.round(
      radiansToDegrees(elevasi)
    )} derajat atau ${elevasi.toFixed(2)} rad`,
    10,
    40
  );

  // Menampilkan teks "Kecepatan awal = ..." pada posisi 10, 60
  ctx.fillText(`Kecepatan awal = ${kecepatanAwal} m/s`, 10, 60);

  // Menampilkan teks "kecepatan Awal sumbu X (Vox) = ..." pada posisi 10, 80
  ctx.fillText(`kecepatan Awal sumbu X (Vox) = ${vox} m/s`, 10, 80);

  // Menampilkan teks "kecepatan Awal sumbu Y (Voy) Voy = ..." pada posisi 10, 100
  ctx.fillText(`kecepatan Awal sumbu Y (Voy) Voy = ${voy} m/s`, 10, 100);

  // Menampilkan teks "X(...) = ..." pada posisi 10, 120
  ctx.fillText(`X(${Math.round(waktu)}) = ${convertToRealScala(x)} m`, 10, 120);

  // Menampilkan teks "Y(...) = ..." pada posisi 10, 140
  ctx.fillText(`Y(${Math.round(waktu)}) = ${convertToRealScala(y)} m`, 10, 140);
};

const enableInput = () => {
  change1 = false;
  change2 = false;
  document.getElementById("input-derajat").disabled = false;
  document.getElementById("input-kecepatan-awal").disabled = false;
};

const disabledInput = () => {
  document.getElementById("reset-button").disabled = true;
  document.getElementById("input-derajat").disabled = true;
  document.getElementById("input-kecepatan-awal").disabled = true;
};

disabledInput();

const animasi = () => {
  x = hitungX();
  y = hitungY();

  bersihkanCanvas();
  gambarBackground();
  textDetail();
  tinggiMaksimum();

  gambarBola(x, canvas.height - y, "white", true);
  gambarJejakBola();

  if (waktu > 0 && y <= 0) {
    enableInput();
    return;
  } else {
    requestAnimationFrame(animasi);
    disabledInput();
  }

  tambahWaktu();
};

const resetSimulasi = () => {
  waktu = 0;
  x = 0;
  y = 0;
  posisiBolaSebelumnya = [];
  animasi();
};

// Callback saat gambar latar belakang selesai dimuat
backgroundImage.onload = function () {
  animasi();
};
