const owner = "RizkyFauziIlmi";
const repo = "project-simulasi-gerak-jatuh-bebas";
const token = "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";

const apiUrlRepo = `https://api.github.com/repos/${owner}/${repo}`;
const apiUrlReleases = `https://api.github.com/repos/${owner}/${repo}/releases`;

fetch(apiUrlRepo, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const stars = data.stargazers_count;
    const forks = data.forks_count;

    document.getElementById("fork-count").textContent = forks;
    document.getElementById("star-count").textContent = stars;
  })
  .catch((error) => {
    console.error("Terjadi kesalahan (Github API):", error);
  });


fetch(apiUrlReleases, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    if (data.length > 0) {
      const latestRelease = data[0];
      const releaseVersion = latestRelease.tag_name;

      document.getElementById('github-releases-version-count').textContent = `V${releaseVersion}`;
    } else {
      console.log("Tidak ada versi rilis yang tersedia");
    }
  })
  .catch((error) => {
    console.error("Terjadi kesalahan:", error);
  });
