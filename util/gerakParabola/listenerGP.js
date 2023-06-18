let change1 = false;
let change2 = false;

let prevDerajat = radiansToDegrees(elevasi);
let prevKecepatanAwal = kecepatanAwal;

const handleDerajatChange = (e) => {
  e.preventDefault();
  const newValue = e.target.value;
  elevasi = degreesToRadians(newValue);
  change1 = true;

  if (change1 && change2) {
    document.getElementById("reset-button").disabled = false;
  }
};

const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

const handleKecepatanAwalChange = (e) => {
  e.preventDefault();
  const newValue = e.target.value;
  kecepatanAwal = parseInt(newValue);
  vox = Math.round(kecepatanAwal * Math.cos(elevasi));
  voy = Math.round(kecepatanAwal * Math.sin(elevasi));
  change2 = true;

  if (change1 && change2) {
    document.getElementById("reset-button").disabled = false;
  }
};

const handleResetButtonClick = () => {
  resetSimulasi();
};

document.getElementById("input-derajat").addEventListener("change", handleDerajatChange);

document.getElementById("input-kecepatan-awal").addEventListener("change", handleKecepatanAwalChange);

document.getElementById("reset-button").addEventListener("click", handleResetButtonClick);

// Event listener untuk window refresh => reset simulasi
window.addEventListener("load", () => {
  const defaultElevasi = degreesToRadians(37);
  const defaultKecepatanAwal = 250;

  document.getElementById("input-derajat").value = radiansToDegrees(defaultElevasi)
  elevasi = defaultElevasi

  document.getElementById("input-kecepatan-awal").value = defaultKecepatanAwal
  kecepatanAwal = kecepatanAwal
});

window.addEventListener('scroll', () => {
  const element = document.getElementById("daftar-isi");
  const scrolly = element.offsetTop === 0 ? undefined : element.offsetTop;

  if (window.scrollY > scrolly) {
    document.getElementById('scroll-to-top-button').style.display = "inline-block"
  } else {
    document.getElementById('scroll-to-top-button').style.display = "none"
  }
})

document.getElementById('scroll-to-top-button').addEventListener('click', () => {
  console.log('red')
  scrollToElement('daftar-isi')
})

// Event listener untuk redirect github repository
document.getElementById("github-button").addEventListener("click", () => {
  const repositoryLink =
    "https://github.com/RizkyFauziIlmi/project-simulasi-gerak-jatuh-bebas";

  window.open(repositoryLink, "_blank");
});