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

/* The class "Planet" has properties of name, color, gravity, and size. */
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

/**
 * The function generates a random number between a minimum and maximum value.
 * @param [min=0] - The minimum value that the generated random number can be. If no value is provided,
 * the default minimum value is 0.
 * @param [max=100] - The maximum value that the generated random number can be. If no value is
 * provided for max, the default value is 100.
 * @returns The function `generateRandom` returns a random integer between the `min` and `max` values
 * (inclusive) passed as arguments. If no arguments are passed, it returns a random integer between 0
 * and 100.
 */
const generateRandom = (min = 0, max = 100) => {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
};

/**
 * The function generates a random hexadecimal color code.
 * @returns The function `generateRandomColorCode` returns a randomly generated hexadecimal color code
 * in the format of `#RRGGBB`, where RR, GG, and BB are two-digit hexadecimal values representing the
 * red, green, and blue components of the color respectively.
 */
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

/**
 * The function adds one second to a given time.
 */
const tambahWaktu = () => {
  waktu += satuDetik;
};

/**
 * The function calculates the estimated time for an object to fall from the height of a canvas based
 * on gravity.
 * @returns The function `hitungEstimasiWaktu` is returning the estimated time it takes for an object
 * to fall from the top to the bottom of the canvas based on the canvas height and gravitational force.
 * The estimated time is calculated using the formula `estimasiWaktu = Math.sqrt((2 * canvas.height) /
 * gravitasi)`.
 */
const hitungEstimasiWaktu = () => {
  const estimasiWaktu = Math.sqrt((2 * canvas.height) / gravitasi);
  return estimasiWaktu;
};

/**
 * The function draws two repeating background layers on a canvas.
 */
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

/**
 * This function draws a circle on a canvas with specified parameters.
 * @param [x] - The x-coordinate of the center of the circle. By default, it is set to the middle of
 * the canvas width.
 * @param [y] - The `y` parameter represents the vertical position of the center of the circle on the
 * canvas. In this code, it is set to `posisiCanvas`, which is likely a variable that holds the desired
 * vertical position.
 * @param [radius] - The radius parameter is the size of the circle that will be drawn on the canvas.
 * It determines the distance from the center of the circle to its edge. In this case, the value of the
 * radius parameter is set to the value of the ukuranPlanet variable, which is likely a predefined
 * value for
 * @param [sAngle=0] - sAngle is the starting angle of the arc in radians. It determines where the arc
 * begins to be drawn along the circumference of the circle. In the code above, it is set to 0, which
 * means the arc will start at the 3 o'clock position of the circle.
 * @param [eAngle] - eAngle is a parameter that specifies the end angle of the arc in radians. In this
 * code, it is set to Math.PI * 2, which is equivalent to 360 degrees in radians, indicating that the
 * arc should be a complete circle.
 */
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

/**
 * The function clears the canvas by removing all content within its boundaries.
 */
const bersihkanCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * The function resets a simulation by hiding a button, resetting variables, and calling an animation
 * function.
 */
const resetSimulasi = () => {
  tombolReset.style.display = "none";
  waktu = 0;
  posisiCanvas = posisiAwal;
  posisiNyata = canvas.height;
  kecepatan = kecepatanAwal;
  animasi();
};

/**
 * The function "menampilkanText" displays information about the ball's position, velocity, time, and
 * other variables on both an HTML element and a canvas.
 */
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


/**
 * This function calculates the real position of an object in a canvas based on its initial position,
 * gravity, initial velocity, and time.
 */
const menghitungPosisi = () => {
  //  Rumus di ubah menjadi + karena titik 0 pad sumbu Y canvas dimulai dari atas
  posisiCanvas =
    posisiAwal + 0.5 * gravitasi * Math.pow(waktu, 2) + kecepatanAwal * waktu;
  posisiNyata = canvas.height - posisiCanvas;
};


/**
 * The function calculates velocity based on gravity and time.
 */
const menghitungKecepatan = () => {
  kecepatan = -gravitasi * waktu;
};


/**
 * The function disables the selectPlanet dropdown and the edit-button.
 */
const disableInput = () => {
  selectPlanet.disabled = true;
  document.getElementById("edit-button").disabled = true;
};


/**
 * The function enables input by displaying a reset button, enabling a select element, and enabling an
 * edit button.
 */
const enableInput = () => {
  tombolReset.style.display = "block";
  selectPlanet.disabled = false;
  document.getElementById("edit-button").disabled = false;
};


/**
 * This function animates a ball on a canvas and resets it if necessary.
 */
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


/* `backgroundImage.onload` is an event listener that waits for the image to finish loading before
executing the function `animasi()`. This ensures that the image is fully loaded before the animation
starts, preventing any potential issues with the image not being fully loaded or displayed properly. */
backgroundImage.onload = function () {
  animasi();
};
