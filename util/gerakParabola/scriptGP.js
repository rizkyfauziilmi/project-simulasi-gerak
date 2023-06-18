/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas-gerak-parabola");
const ctx = canvas.getContext("2d");

/* It sets the width and height of the canvas element to be 100 pixels less than the width of the
window and 1.5 times the height of the window, respectively. This is done to make the canvas element
fit nicely within the webpage and to provide enough space for the animation to be displayed. */
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight / 1.5;


/* It creates a new Image object and sets its source to the image file located at
"../../public/park.jpg". This image will be used as the background for the canvas element in the
animation. */
const backgroundImage = new Image();
backgroundImage.src = "../../public/park.jpg";


/**
 * The function converts radians to degrees in JavaScript.
 * @param radians - The parameter "radians" is a number representing an angle in radians that we want
 * to convert to degrees.
 * @returns The function `radiansToDegrees` returns the value of `radians` converted from radians to
 * degrees.
 */
const radiansToDegrees = (radians) => {
  return radians * (180 / Math.PI);
}

/**
 * The function converts degrees to radians in JavaScript.
 * @param degrees - The "degrees" parameter is a number representing an angle in degrees that we want
 * to convert to radians.
 * @returns The function `degreesToRadians` returns the value of `degrees` converted to radians.
 */
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
let animationId;
let intervalId;

// Array untuk menyimpan posisi bola sebelumnya
let posisiBolaSebelumnya = [];

const setPath = () => {
  path = true;
}

const startInterval = () => {
  intervalId = setInterval(setPath, 500);
}

startInterval();

const stopInterval = () => {
  clearInterval(intervalId);
}


/**
 * The function draws a non-transparent background image onto a canvas.
 */
const gambarBackground = () => {
  ctx.globalAlpha = 1; // Mengatur nilai transparansi global menjadi 1 (tidak transparan)
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Menggambar gambar latar belakang pada canvas menggunakan metode drawImage
};

/**
 * The function converts a given coordinate value to a real scale by multiplying it with 5.
 * @param koordinat - The parameter "koordinat" is likely a numerical value representing a coordinate
 * in some system. The function "convertToRealScala" takes this coordinate and multiplies it by 5,
 * returning the result.
 * @returns The function `convertToRealScala` takes a parameter `koordinat` and returns the result of
 * multiplying it by 5.
 */
const convertToRealScala = (koordinat) => {
  return koordinat * 5;
};

/**
 * The function adds one second to a given time.
 */
const tambahWaktu = () => {
  waktu += satuDetik;
};



/**
 * The function draws a semi-transparent trail of balls in a specified color based on previous ball
 * positions stored in an array.
 * @param [warna=white] - The parameter "warna" is a string that represents the color of the ball trail
 * that will be drawn on the canvas. If no value is provided for "warna", the default color will be
 * white.
 */
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

/**
 * The function draws a ball on a canvas and adds its position to an array if called within the main
 * animation function.
 * @param [xCanvas] - the x-coordinate of the center of the ball on the canvas.
 * @param [yCanvas] - The y-coordinate of the center of the circle to be drawn on the canvas. It is set
 * to the height of the canvas minus the value of the variable "y".
 * @param [warna=red] - The "warna" parameter is a string that represents the color of the ball that
 * will be drawn on the canvas. It has a default value of "red" if no value is provided when the
 * function is called.
 * @param [main=false] - The "main" parameter is a boolean value that indicates whether the
 * "gambarBola" function is being called from the main animation loop or not. If it is being called
 * from the main loop, it will add the current position of the ball to an array of previous ball
 * positions.
 */
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

/**
 * The function clears the canvas by removing all content within its boundaries.
 */
const bersihkanCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};


/**
 * This function calculates the value of x by adding the product of vox and time to xAwal, dividing the
 * result by 5, and rounding the final value.
 * @param [t] - t is a parameter that represents the time elapsed since the start of the motion. It is
 * used in the calculation of the value of x, which is then divided by 5 and rounded before being
 * returned.
 * @returns the value of `x` which has been divided by 5 and rounded to the nearest integer.
 */
const hitungX = (t = waktu) => {
  let x = xAwal + vox * t; // Menghitung nilai x dengan rumus xAwal + vox * t
  x /= 5; // Membagi nilai x dengan 5
  return Math.round(x); // Mengembalikan nilai x yang telah dibulatkan
};


/**
 * The function calculates the value of y using a given formula and scales it down by dividing it by 5,
 * with a condition to set the value to 0 if it is less than 0, and returns the rounded value of y.
 * @param [t] - t is a parameter representing time, which is used in the calculation of the value of y.
 * It is an optional parameter with a default value of "waktu". If a value is not provided for t, the
 * function will use the default value.
 * @returns the value of `y` which has been rounded to the nearest integer using the `Math.round()`
 * method.
 */
const hitungY = (t = waktu) => {
  let y = yAwal - (1 / 2) * gravitasi * Math.pow(t, 2) + voy * t; // Menghitung nilai y dengan rumus yAwal - (1/2) * gravitasi * t^2 + voy * t
  y /= 5; // Membagi nilai y dengan 5 untuk skala 1:5
  if (y < 0) {
    // Memeriksa apakah nilai y kurang dari 0
    y = 0; // Jika iya, maka nilai y diubah menjadi 0
  }
  return Math.round(y); // Mengembalikan nilai y yang telah dibulatkan
};

/**
 * The function calculates the maximum time of flight for a projectile given its initial velocity,
 * elevation angle, and gravitational constant.
 * @returns The function `hitungWaktuMax` is returning the maximum time it takes for a projectile to
 * reach its highest point, calculated using the initial velocity (`kecepatanAwal`), elevation angle
 * (`elevasi`), and gravitational acceleration (`gravitasi`). The result is rounded to the nearest
 * integer using the `Math.round()` method.
 */
const hitungWaktuMax = () => {
  return Math.round((kecepatanAwal * Math.sin(elevasi)) / gravitasi);
};


/**
 * This function calculates the maximum height of a projectile, draws a dashed line and displays the
 * maximum height and time taken to reach it above a canvas, and also draws a yellow ball at the
 * position of maximum height.
 */
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


/**
 * The function displays various text details on a canvas using the CanvasRenderingContext2D API in
 * JavaScript.
 */
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

/**
 * This function animates a bouncing ball on a canvas and enables input when the ball reaches the top
 * or the time runs out.
 * @returns If the condition `if (waktu > 0 && y <= 0)` is true, then the function will return and
 * enable input. Otherwise, if the condition is false, the function will continue to run and request
 * another animation frame while disabling input. No specific value is being returned.
 */
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
    cancelAnimationFrame(animationId)
  } else {
    animationId = requestAnimationFrame(animasi);
  }

  tambahWaktu();
};

/**
 * The function resets the simulation by setting the time, position of the ball, and previous ball
 * positions to zero and then calling the animation function.
 */
const resetSimulasi = () => {
  cancelAnimationFrame(animationId);
  stopInterval();
  
  waktu = 0;
  x = 0;
  y = 0;
  posisiBolaSebelumnya = [];

  startInterval();

  animasi();
};


/* The above code is defining a function that will be executed when the `onload` event of an image with
the variable name `backgroundImage` is triggered. The function `animasi()` is being called inside
the `onload` event handler. */
backgroundImage.onload = function () {
  animasi();
};