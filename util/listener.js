let isBlock = false;
const iframeFlowchart = document.getElementById("iframe-flowchart");

/**
 * This function scrolls smoothly to a specified element on a webpage.
 * @param elementId - The ID of the HTML element that you want to scroll to.
 */
const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* This code adds an event listener to a dropdown menu with the ID "selectPlanet". When the user
selects an option from the dropdown, the function inside the event listener is executed. The
function gets the value of the selected option and checks if it is equal to "custom". If it is, it
displays a button with the ID "edit-button". If it is not, it hides the button. Then, it loops
through an array called "dataPlanet" and finds the object with a "nama" property that matches the
selected planet. It sets the values of "gravitasi", "warnaPlanetSekarang", and "ukuranPlanet" to the
corresponding values in the object, and then calls a function called "resetSimulasi()". */
selectPlanet.addEventListener("change", (e) => {
  const planet = e.target.value;

  if (planet === "custom") {
    document.getElementById("edit-button").style.display = "block";
  } else {
    document.getElementById("edit-button").style.display = "none";
  }

  dataPlanet.map((value) => {
    if (value.nama === planet) {
      gravitasi = value.gravitasi;
      warnaPlanetSekarang = value.warna;
      ukuranPlanet = value.ukuran;
      resetSimulasi();
    }
  });
});


/* This code adds an event listener to a checkbox element with the ID "checkboxResetOtomatis". When the
user changes the value of the checkbox, the function inside the event listener is executed. If the
value of the checkbox is checked, the variable "resetOtomatis" is set to true. If the value of the
checkbox is unchecked and the ball has already hit the canvas and "resetOtomatis" is false, the
function "resetSimulasi()" is called to reset the simulation. */
checkboxResetOtomatis.addEventListener("change", (e) => {
  // jika user mengganti nilai checkbox saat bola sudah mengenai canvas dan reset otamatis tidak nyala maka akan reset simulasi
  if (!(posisiCanvas < canvas.height) && !resetOtomatis) {
    resetSimulasi();
  }

  const isChecked = e.target.checked;
  resetOtomatis = isChecked;
});


/* This code adds an event listener to a checkbox element with the ID "checkboxTampilkanSatuan". When
the user changes the value of the checkbox, the function inside the event listener is executed. It
gets the value of the checkbox and sets the value of a variable called "tamplikanSatuan" to the
value of the checkbox. If the ball has already hit the canvas, it calls three functions to clear the
canvas, draw the ball, and display text on the canvas. */
checkboxTampilkanSatuan.addEventListener("change", (e) => {
  const isChecked = e.target.checked;

  tamplikanSatuan = isChecked;

  if (!(posisiCanvas < canvas.height)) {
    bersihkanCanvas();
    gambarBola();
    menampilkanText();
  }
});


/* This code adds an event listener to a button element with the ID "github-button". When the button is
clicked, the function inside the event listener is executed. The function opens a new window with
the URL "https://github.com/RizkyFauziIlmi/project-simulasi-gerak-jatuh-bebas" using the "_blank"
target, which opens the link in a new tab. This allows the user to navigate to the GitHub repository
for the project. */
document.getElementById("github-button").addEventListener("click", () => {
  const repositoryLink =
    "https://github.com/RizkyFauziIlmi/project-simulasi-gerak";

  window.open(repositoryLink, "_blank");
});


/**
 * This function enables an iframe and displays a flowchart detail.
 */
const enableIframe = () => {
  iframeFlowchart.style.transition = "opacity 0.3s ease";
  iframeFlowchart.style.position = "relative";
  iframeFlowchart.style.zIndex = "1";
  iframeFlowchart.style.opacity = "1";
  iframeFlowchart.classList.add("show-iframe");
  document.getElementById("flowchart-detail").style.display = "flex";
}

/**
 * This function disables an iframe by changing its style properties and hiding it.
 */
const disableIframe = () => {
  iframeFlowchart.style.transition = "none";
  iframeFlowchart.style.position = "absolute";
  iframeFlowchart.style.zIndex = "-100";
  iframeFlowchart.style.opacity = "0";
  iframeFlowchart.classList.remove("show-iframe");
  document.getElementById("flowchart-detail").style.display = "none";
}

/* This code adds an event listener to a button element with the ID "show-flowchart-button". When the
button is clicked, the function inside the event listener is executed. If the variable "isBlock" is
false, it calls a function called "enableIframe()" to enable an iframe and display a flowchart
detail. If the variable "isBlock" is true, it calls a function called "disableIframe()" to disable
the iframe by changing its style properties and hiding it. Then, it toggles the value of the
variable "isBlock" between true and false. */
document
  .getElementById("show-flowchart-button")
  .addEventListener("click", () => {
    if (!isBlock) {
      enableIframe();
    } else {
      disableIframe();
    }

    isBlock = !isBlock;
  });


/* This code adds an event listener to the window object that listens for the "load" event. When the
window finishes loading, the function inside the event listener is executed. The function sets the
value of the dropdown menu with the ID "selectPlanet" to "bumi", sets the value of the checkbox with
the ID "checkboxResetOtomatis" to false, sets the value of the checkbox with the ID
"checkboxTampilkanSatuan" to true, and hides a button with the ID "tombolReset". This code is used
to set the initial state of the page when it finishes loading. */
window.addEventListener("load", () => {
  selectPlanet.value = "bumi";
  checkboxResetOtomatis.checked = false;
  checkboxTampilkanSatuan.checked = true;
  tombolReset.style.display = "none";
});

/* This code adds an event listener to a button element with the ID "close-button-modal". When the
button is clicked, the function inside the event listener is executed. The function sets the display
style of an HTML element with the ID "modal-container" to "none", which hides the modal. It also
calls a function called "resetSimulasi()" to reset the simulation. */
document.getElementById("close-button-modal").addEventListener("click", () => {
  document.getElementById("modal-container").style.display = "none";
  resetSimulasi();
});

const colorPickerElement = document.getElementById("color-input");
const gravityInputElement = document.getElementById("gravity-input");
const sizePlanetElement = document.getElementById("size-planet-input");
const customPlanetObject = dataPlanet.slice(-1)[0];

/* This code adds an event listener to an HTML input element with the ID "color-input". When the user
changes the value of the input element, the function inside the event listener is executed. The
function gets the value of the input element and sets the value of two variables,
"warnaPlanetSekarang" and "customPlanetObject.warna", to the value of the input element. These
variables are used to set the color of the planet in the simulation. */
colorPickerElement.addEventListener("input", () => {
  warnaPlanetSekarang = colorPickerElement.value;
  customPlanetObject.warna = colorPickerElement.value;
});

/* This code adds an event listener to an HTML input element with the ID "gravity-input". When the user
changes the value of the input element, the function inside the event listener is executed. The
function gets the value of the input element and sets the value of two variables, "gravitasi" and
"customPlanetObject.gravitasi", to the parsed integer value of the input element. These variables
are used to set the gravity of the planet in the simulation. */
gravityInputElement.addEventListener("change", (e) => {
  const newGravity = parseFloat(e.target.value);
  gravitasi = newGravity;
  customPlanetObject.gravitasi = newGravity;
});

/* This code adds an event listener to an HTML input element with the ID "size-planet-input". When the
user changes the value of the input element, the function inside the event listener is executed. The
function gets the value of the input element and sets the value of two variables, "ukuranPlanet" and
"customPlanetObject.ukuran", to the parsed integer value of the input element. These variables are
used to set the size of the planet in the simulation. */
sizePlanetElement.addEventListener("change", (e) => {
  const newSize = parseInt(e.target.value);
  ukuranPlanet = newSize;
  customPlanetObject.ukuran = newSize;
});

/* This code adds an event listener to a button element with the ID "edit-button". When the button is
clicked, the function inside the event listener is executed. The function sets the value of three
input elements, "colorPickerElement", "gravityInputElement", and "sizePlanetElement", to the
corresponding values in an object called "customPlanetObject". It then sets the display style of an
HTML element with the ID "modal-container" to "flex", which displays a modal. This code allows the
user to edit the properties of a custom planet in the simulation. */
document.getElementById("edit-button").addEventListener("click", () => {
  colorPickerElement.value = customPlanetObject.warna;
  gravityInputElement.value = customPlanetObject.gravitasi;
  sizePlanetElement.value = customPlanetObject.ukuran;
  document.getElementById("modal-container").style.display = "flex";
});

/* This code adds an event listener to the window object that listens for the "scroll" event. When the
user scrolls the webpage, the function inside the event listener is executed. The function gets the
HTML element with the ID "daftar-isi" and calculates its offset from the top of the page. If the
user has scrolled past this offset, the function displays a button with the ID
"scroll-to-top-button" by setting its display style to "inline-block". If the user has not scrolled
past this offset, the function hides the button by setting its display style to "none". This code
allows the user to easily scroll back to the top of the page by clicking the "scroll-to-top-button". */
window.addEventListener('scroll', () => {
  const element = document.getElementById("daftar-isi");
  const scrolly = element.offsetTop === 0 ? undefined : element.offsetTop;

  if (window.scrollY > scrolly) {
    document.getElementById('scroll-to-top-button').style.display = "inline-block"
  } else {
    document.getElementById('scroll-to-top-button').style.display = "none"
  }
})
/* This code adds an event listener to a button element with the ID "scroll-to-top-button". When the
button is clicked, the function inside the event listener is executed. The function calls the
`scrollToElement()` function with the argument "daftar-isi", which is the ID of an HTML element on
the page. The `scrollToElement()` function scrolls smoothly to the HTML element with the ID
"daftar-isi", which is the table of contents section of the page. This allows the user to easily
scroll back to the top of the page by clicking the "scroll-to-top-button". */
document.getElementById('scroll-to-top-button').addEventListener('click', () => {
  scrollToElement('daftar-isi')
})