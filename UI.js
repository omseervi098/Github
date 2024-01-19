class UI {
  constructor(profile, repos) {
    this.profile = profile;
    this.repos = repos;
  }
  hideProfileLoader() {
    this.profile.innerHTML = "";
  }
  hideReposLoader() {
    this.repos.innerHTML = "";
  }

  showProfileLoader() {
    this.profile.innerHTML = `
        <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
        </div>
        `;
  }
  showReposLoader() {
    this.repos.innerHTML = `
        <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
        </div>
        `;
  }
  showNoProfileFound() {
    this.profile.innerHTML = `
        <div class="d-flex justify-content-center">
        <h1>No Profile Found</h1>
        </div>
        `;
  }
  showNoReposFound() {
    this.repos.innerHTML = `
        <div class="d-flex justify-content-center">
        <h1>No Repos Found</h1>
        </div>
        `;
  }
  showProfile(user) {
    let output = `
        <div class="card card-body container mb-3 mt-3">
        <div class="row align-items-center">
        <div class="col-12 col-md-4">
        <img class="img-fluid mb-2" src="${user.avatar_url}">
          <a href="${
            user.html_url
          }" target="_blank" class="text-decoration-none mb-4"> <i class="bi bi-link"></i> ${
      user.html_url
    }</a>
        </div>
        <div class="col-md-8">
        <h5 class="card-title">${user.name}</h5>
        <p class="card-text my-2">${user.bio}</p>
        ${
          user.location
            ? `<p class="card-text my-2"><i class="bi bi-geo-alt-fill"></i> ${user.location}</p>`
            : ""
        }
        ${user.email ? `<p class="card-text my-2">${user.email}</p>` : ""}
        ${
          user.twitter_username
            ? `<p class="card-text my-2"><i class="bi bi-twitter"></i> ${user.twitter_username}</p>`
            : ""
        }
        ${
          user.blog
            ? `<a href="${user.blog}" class="card-text my-2 text-decoration-none"><i class="bi bi-link"></i> ${user.blog}</a>`
            : ""
        }
        <div class="d-flex justify-content-start gap-2 my-2">
        <span class="badge bg-primary p-2 me-1">${
          user.followers
        } Followers</span>
        <span class="badge bg-success p-2 me-1">${
          user.following
        } Following</span>
        <span class="badge bg-warning p-2 me-1">${
          user.public_repos
        } Repos</span>
        </div>
        <p class="card-text my-2">Member since: ${new Date(
          user.created_at
        ).toLocaleDateString()}</p>
      `;
    this.profile.innerHTML = output;
  }
  showRepos(repos) {
    let output = "";
    repos.forEach((repo) => {
      output += `
        <div class="card card-body mb-2 col-5 d=flex flex-column justify-content-between">
        <h4 class="text-primary ">
        <a href="${
          repo.html_url
        }" class="text-decoration-none" target="_blank">${repo.name}</a>
        </h4>
        ${repo.description ? `<span class="">${repo.description}</span>` : ""}
        <div class="languages d-flex flex-wrap gap-2">
        ${
          repo.languages
            ? (function () {
                let output = "";
                for (let language in repo.languages.languages) {
                  output += `<span class="badge bg-primary p-2 me-1">${language}</span>`;
                }
                return output;
              })()
            : ""
        }
        </div>
        </div>
        `;
    });
    this.repos.innerHTML = `
        <div class="container">
        <div class="row gap-2">
          ${output}
          </div>
          </div>
    `;
  }
}
