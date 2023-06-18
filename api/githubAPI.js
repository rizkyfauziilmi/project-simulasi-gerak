/* These lines of code are creating variables that store the owner's username, repository name, and an
API token for authentication to access the GitHub API. The `owner` variable stores the username of
the owner of the repository, the `repo` variable stores the name of the repository, and the `token`
variable stores an API token that is used to authenticate the requests to the GitHub API. */
const owner = "RizkyFauziIlmi";
const repo = "project-simulasi-gerak-jatuh-bebas";
const token = apiKey;

/* The `const apiUrlRepo` and `const apiUrlReleases` are creating variables that store the URLs for the
GitHub API endpoints to retrieve information about a specific repository (`/`) and
its releases (`//releases`). These URLs are then used in the `fetch` requests to
retrieve data from the GitHub API. */
const apiUrlRepo = `https://api.github.com/repos/${owner}/${repo}`;
const apiUrlReleases = `https://api.github.com/repos/${owner}/${repo}/releases`;

/* This code is making a `fetch` request to the GitHub API endpoint for a specific repository
(`apiUrlRepo`) with an `Authorization` header that includes an API token (`token`). Once the
response is received, it is converted to JSON format using the `response.json()` method. Then, the
`data` object is used to extract the number of stars and forks for the repository. Finally, the
number of stars and forks are displayed on the webpage by updating the text content of the HTML
elements with the IDs `fork-count` and `star-count`, respectively. If there is an error during the
`fetch` request, it will be caught and logged to the console. */
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

/* This code is making a `fetch` request to the GitHub API endpoint for a specific repository's
releases (`apiUrlReleases`) with an `Authorization` header that includes an API token (`token`).
Once the response is received, it is converted to JSON format using the `response.json()` method.
Then, the `data` object is used to extract the latest release version number (`tag_name`) and
display it on the webpage by updating the text content of the HTML element with the ID
`github-releases-version-count`. If there are no releases available, a message is logged to the
console. If there is an error during the `fetch` request, it will be caught and logged to the
console. */
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

      document.getElementById(
        "github-releases-version-count"
      ).textContent = `V${releaseVersion}`;
    } else {
      console.log("Tidak ada versi rilis yang tersedia");
    }
  })
  .catch((error) => {
    console.error("Terjadi kesalahan (Github API):", error);
  });
