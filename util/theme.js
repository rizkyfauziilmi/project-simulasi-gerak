// Mengecek apakah preferensi tema pengguna adalah dark mode
const darkOsTheme = window.matchMedia("(prefers-color-scheme: dark)");

// Menginisialisasi variabel isDark berdasarkan preferensi tema
let isDark = darkOsTheme.matches ? true : false;

// Variabel initState untuk melacak apakah inisialisasi pertama kali dilakukan
let initState = true;

// Element background
const background = document.getElementById("body");

// Fungsi untuk mengubah tampilan menjadi dark mode
const turnDark = () => {
  background?.classList.toggle("dark-mode");
  // Mengubah properti tampilan planet
  document.getElementById('planet').style = "background: #3e3e42; color: white;";
  // Mengubah kelas pada elemen select-container
  document.getElementById('select-container').classList.remove("select-light");
  document.getElementById('select-container').classList.add("select-dark");
  // Mengubah ikon dan teks pada tombol toggle tema
  document.getElementById("icon-theme").classList.remove("fa-moon-o");
  document.getElementById("icon-theme").classList.add("fa-sun-o");
  document.getElementById("icon-theme").innerHTML = " Dark";
  // Mengubah warna latar belakang container perhitungan
  document.getElementById("detail-perhitungan-container").style.backgroundColor = "#252526";
  // Mengubah warna latar belakang elemen li pada rumus-container
  document.querySelectorAll(".rumus-container ul li").forEach((el) => {
    el.style.backgroundColor = "#252526";
  });
  // Mengubah warna border pada elemen canvas
  document.getElementById("canvas").style.border = "#252526 solid 5px";
  // Mengubah tampilan tombol
  document.querySelectorAll("button").forEach((el) => {
    if (el.id === "reset-button") {
      el.classList.remove("reset-button-light");
      el.classList.add("reset-button-dark");
    } else {
      el.style.backgroundColor = "#3e3e42";
      el.style.border = "2px solid #252526";
      el.style.color = "white";
    }
  });

  document.getElementById('gerak-parabola-href').style.color = "white"
  document.getElementById('modal').classList.remove('modal-light')

  isDark = true;
};

// Fungsi untuk mengubah tampilan menjadi light mode
const turnLight = () => {
  // Toggle class dark-mode pada background jika bukan inisialisasi pertama kali
  if (!initState) {
    background.classList.toggle("dark-mode");  
  }
  // Mengubah properti tampilan planet
  document.getElementById('planet').style = "background: #cccccc; color: #000000;";
  // Mengubah kelas pada elemen select-container
  document.getElementById('select-container').classList.remove("select-dark");
  document.getElementById('select-container').classList.add("select-light");
  // Mengubah ikon dan teks pada tombol toggle tema
  document.getElementById("icon-theme").classList.remove("fa-sun-o");
  document.getElementById("icon-theme").classList.add("fa-moon-o");
  document.getElementById("icon-theme").innerHTML = " Light";
  // Mengubah warna latar belakang container perhitungan
  document.getElementById("detail-perhitungan-container").style.backgroundColor = "#cccccc";
  // Mengubah warna latar belakang elemen li pada rumus-container
  document.querySelectorAll(".rumus-container ul li").forEach((el) => {
    el.style.backgroundColor = "#cccccc";
  });
  // Mengubah warna border pada elemen canvas
  document.getElementById("canvas").style.border = "#cccccc solid 5px";
  // Mengubah tampilan tombol
  document.querySelectorAll("button").forEach((el) => {
    if (el.id === "reset-button") {
      el.classList.remove("reset-button-dark");
      el.classList.add("reset-button-light");
    } else {
      el.style.backgroundColor = "#fff0f0";
      el.style.color = "black";
      el.style.border = "2px solid #b18597";
    }
  });

  document.getElementById('gerak-parabola-href').style.color = "black"
  document.getElementById('modal').classList.add('modal-light')

  isDark = false;
};

// Fungsi inisialisasi tema saat halaman dimuat
const init = () => {
  if (isDark) {
    turnDark();
  } else {
    turnLight();
  }

  initState = false;
};

// Fungsi untuk mengganti tema saat tombol toggle tema ditekan
const toggleTheme = () => {
  if (isDark) {
    turnLight();
  } else {
    turnDark();
  }
};

// Inisialisasi tema saat halaman dimuat
init();

// Menambahkan event listener pada tombol toggle tema
document.getElementById("toggle-theme-button").addEventListener("click", () => {
  toggleTheme();
});