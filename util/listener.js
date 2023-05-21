// Event listener pada select option
selectPlanet.addEventListener("change", (e) => {
  const planet = e.target.value;

  dataPlanet.map((value) => {
    if (value.nama === planet) {
      gravitasi = value.gravitasi;
      warnaPlanetSekarang = value.warna;
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

// Event listener untuk window refresh => reset simulasi
window.addEventListener("load", () => {
  selectPlanet.value = "bumi";
  checkboxTampilkanSatuan.checked = true;
  tombolReset.style.display = "none";
});
