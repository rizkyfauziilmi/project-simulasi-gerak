/* These lines of code are checking the user's preferred color scheme (light or dark) using the
`matchMedia()` method. The result is stored in the `darkOsTheme` constant. The `matches` property of
`darkOsTheme` is then used to set the initial value of the `isDark` variable to `true` if the user
prefers dark mode, and `false` otherwise. The `initState` variable is set to `true` to indicate that
the initial state of the theme has not been set yet. */
const darkOsTheme = window.matchMedia("(prefers-color-scheme: dark)");
let isDark = darkOsTheme.matches ? true : false;
let initState = true;


/* `const background = document.getElementById("body");` is selecting the HTML element with the ID of
"body" and assigning it to the `background` constant. This element is likely the background of the
webpage and will be used later in the code to toggle the "dark-mode" class on and off to change the
theme of the webpage. */
const background = document.getElementById("body");


/**
 * The function turns the website into a dark mode theme by changing various elements' colors and
 * styles.
 */
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


/**
 * The function changes the visual theme of the webpage to a light mode.
 */
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


/**
 * The function initializes the page's color scheme based on a boolean value.
 */
const init = () => {
  if (isDark) {
    turnDark();
  } else {
    turnLight();
  }

  initState = false;
};


/**
 * The function toggles between a light and dark theme.
 */
const toggleTheme = () => {
  if (isDark) {
    turnLight();
  } else {
    turnDark();
  }
};


/* `init();` is calling the `init()` function, which initializes the page's color scheme based on the
value of the `isDark` variable. If `isDark` is `true`, the `turnDark()` function is called to set
the page to a dark mode theme. If `isDark` is `false`, the `turnLight()` function is called to set
the page to a light mode theme. The `initState` variable is also set to `false` to indicate that the
initial state of the theme has been set. */
init();


/* This code is adding an event listener to the HTML element with the ID of "toggle-theme-button". When
this element is clicked, the `toggleTheme()` function is called, which toggles the visual theme of
the webpage between light and dark mode. */
document.getElementById("toggle-theme-button").addEventListener("click", () => {
  toggleTheme();
});