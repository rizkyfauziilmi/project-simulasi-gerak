const reCalculate = (kecepatanAwal, elevasi) => {
  vox = Math.round(kecepatanAwal * Math.cos(elevasi));
  voy = Math.round(kecepatanAwal * Math.sin(elevasi));
};

/**
 * This function handles a change in degree value input and converts it to radians while also enabling
 * a reset button.
 * @param e - e is an event object that is passed as an argument to the handleDerajatChange function.
 * It represents the event that triggered the function, in this case, a change event on an input
 * element. The event object contains information about the event, such as the target element, the type
 * of event
 */
const handleDerajatChange = (e) => {
  e.preventDefault();

  const newValue = e.target.value;
  elevasi = degreesToRadians(newValue);

  reCalculate(kecepatanAwal, elevasi);

  resetSimulasi();
};

/**
 * This function scrolls smoothly to a specified element on a webpage.
 * @param elementId - The ID of the HTML element that you want to scroll to.
 */
const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

/**
 * This function handles the change in the initial speed input and updates the values of vox and voy
 * accordingly.
 * @param e - The parameter `e` is an event object that is passed to the function
 * `handleKecepatanAwalChange` when the event of changing the value of an input element is triggered.
 * It contains information about the event, such as the target element that triggered the event and the
 * new value of
 */
const handleKecepatanAwalChange = (e) => {
  e.preventDefault();
  const newValue = e.target.value;
  kecepatanAwal = parseFloat(newValue);

  reCalculate(kecepatanAwal, elevasi);

  resetSimulasi();
};

/**
 * The function handles a reset button click event and calls the resetSimulasi function.
 */
const handleResetButtonClick = () => {
  resetSimulasi();
};

document
  .getElementById("input-derajat")
  .addEventListener("change", handleDerajatChange);

document
  .getElementById("input-kecepatan-awal")
  .addEventListener("change", handleKecepatanAwalChange);

document
  .getElementById("reset-button")
  .addEventListener("click", handleResetButtonClick);

/* This code adds an event listener to the `window` object for the "load" event. When the webpage
finishes loading, the function passed as the second argument to `addEventListener` is called. This
function sets the default values for the `elevasi` and `kecepatanAwal` variables, converts the
default `elevasi` value from degrees to radians, and sets the values of the input elements with IDs
"input-derajat" and "input-kecepatan-awal" to the default values. */
window.addEventListener("load", () => {
  const defaultElevasi = degreesToRadians(37);
  const defaultKecepatanAwal = 250;

  document.getElementById("input-derajat").value =
    radiansToDegrees(defaultElevasi);
  elevasi = defaultElevasi;

  document.getElementById("input-kecepatan-awal").value = defaultKecepatanAwal;
  kecepatanAwal = kecepatanAwal;
});

/* This code adds an event listener to the window object for the "scroll" event. When the user scrolls
the webpage, the function passed as the second argument to `addEventListener` is called. This
function first gets the HTML element with the ID "daftar-isi" and stores it in the `element`
variable. It then checks if the `offsetTop` property of the element is equal to 0. If it is, it sets
the `scrolly` variable to `undefined`, otherwise it sets it to the `offsetTop` value. */
window.addEventListener("scroll", () => {
  const element = document.getElementById("daftar-isi");
  const scrolly = element.offsetTop === 0 ? undefined : element.offsetTop;

  if (window.scrollY > scrolly) {
    document.getElementById("scroll-to-top-button").style.display =
      "inline-block";
  } else {
    document.getElementById("scroll-to-top-button").style.display = "none";
  }
});

/* This code adds an event listener to the HTML element with the ID "scroll-to-top-button". When the
button is clicked, it calls the `scrollToElement` function with the argument "daftar-isi", which
scrolls smoothly to the HTML element with the ID "daftar-isi" on the webpage. Additionally, it logs
the string "red" to the console, but this is likely a debugging statement that can be removed. This
code is likely used to provide a button that allows the user to quickly scroll back to the top of
the webpage. */
document
  .getElementById("scroll-to-top-button")
  .addEventListener("click", () => {
    console.log("red");
    scrollToElement("daftar-isi");
  });

/* This code adds an event listener to the HTML element with the ID "github-button". When the button is
clicked, it opens a new window with the URL
"https://github.com/RizkyFauziIlmi/project-simulasi-gerak-jatuh-bebas" using the "_blank" target,
which opens the link in a new tab. This code is likely used to provide a link to the GitHub
repository for the project. */
document.getElementById("github-button").addEventListener("click", () => {
  const repositoryLink =
    "https://github.com/RizkyFauziIlmi/project-simulasi-gerak";

  window.open(repositoryLink, "_blank");
});
