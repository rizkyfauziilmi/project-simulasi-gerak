let isBlock = false;
const iframeFlowchart = document.getElementById("iframe-flowchart");

const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

// Event listener pada select option
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

// Event listener pada checkbox reset otomatis
checkboxResetOtomatis.addEventListener("change", (e) => {
  // jika user mengganti nilai checkbox saat bola sudah mengenai canvas dan reset otamatis tidak nyala maka akan reset simulasi
  if (!(posisiCanvas < canvas.height) && !resetOtomatis) {
    resetSimulasi();
  }

  const isChecked = e.target.checked;
  resetOtomatis = isChecked;
});

// Event listener pada checkbox tamplikan satuan
checkboxTampilkanSatuan.addEventListener("change", (e) => {
  const isChecked = e.target.checked;

  tamplikanSatuan = isChecked;

  if (!(posisiCanvas < canvas.height)) {
    bersihkanCanvas();
    gambarBola();
    menampilkanText();
  }
});

// Event listener untuk redirect github repository
document.getElementById("github-button").addEventListener("click", () => {
  const repositoryLink =
    "https://github.com/RizkyFauziIlmi/project-simulasi-gerak-jatuh-bebas";

  window.open(repositoryLink, "_blank");
});

// Event listener untuk toggle menampilkan iframe flowchart
const enableIframe = () => {
  iframeFlowchart.style.transition = "opacity 0.3s ease";
  iframeFlowchart.style.position = "relative";
  iframeFlowchart.style.zIndex = "1";
  iframeFlowchart.style.opacity = "1";
  iframeFlowchart.classList.add("show-iframe");
  document.getElementById("flowchart-detail").style.display = "flex";
}

const disableIframe = () => {
  iframeFlowchart.style.transition = "none";
  iframeFlowchart.style.position = "absolute";
  iframeFlowchart.style.zIndex = "-100";
  iframeFlowchart.style.opacity = "0";
  iframeFlowchart.classList.remove("show-iframe");
  document.getElementById("flowchart-detail").style.display = "none";
}

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

// Event listener untuk window refresh => reset simulasi
window.addEventListener("load", () => {
  selectPlanet.value = "bumi";
  checkboxResetOtomatis.checked = false;
  checkboxTampilkanSatuan.checked = true;
  tombolReset.style.display = "none";
});

document.getElementById("close-button-modal").addEventListener("click", () => {
  document.getElementById("modal-container").style.display = "none";
  resetSimulasi();
});

const colorPickerElement = document.getElementById("color-input");
const gravityInputElement = document.getElementById("gravity-input");
const sizePlanetElement = document.getElementById("size-planet-input");
const customPlanetObject = dataPlanet.slice(-1)[0];

colorPickerElement.addEventListener("input", () => {
  warnaPlanetSekarang = colorPickerElement.value;
  customPlanetObject.warna = colorPickerElement.value;
});

gravityInputElement.addEventListener("change", (e) => {
  const newGravity = parseInt(e.target.value);
  gravitasi = newGravity;
  customPlanetObject.gravitasi = newGravity;
});

sizePlanetElement.addEventListener("change", (e) => {
  const newSize = parseInt(e.target.value);
  ukuranPlanet = newSize;
  customPlanetObject.ukuran = newSize;
});

document.getElementById("edit-button").addEventListener("click", () => {
  colorPickerElement.value = customPlanetObject.warna;
  gravityInputElement.value = customPlanetObject.gravitasi;
  sizePlanetElement.value = customPlanetObject.ukuran;
  document.getElementById("modal-container").style.display = "flex";
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
  scrollToElement('daftar-isi')
})