const searchUser = document.getElementById("searchUser");
const profile = document.getElementById("profile");
const repos = document.getElementById("repos");
const pageitems = document.getElementsByClassName("page-item-no");
const perpage = document.getElementById("perpage");
const orderby = document.getElementById("orderby");
const sortby = document.getElementById("sortby");
const searchRepo = document.getElementById("searchrepos");
const searchReposForm = document.getElementById("searchRepos");
const pageitemprev = document.getElementById("page-item-no-prev");
const pageitemnext = document.getElementById("page-item-no-next");
const ui = new UI(profile, repos);
const github = new Github();
searchUser.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userText = e.target.username.value;
  if (userText !== "") {
    github.setUsername(userText);
    ui.showProfileLoader();
    const user = await github.getUser();
    if (user.profile.message === "Not Found") {
      ui.hideProfileLoader();
      ui.showNoProfileFound();
      return;
    }
    ui.showReposLoader();
    const repos = await github.combineReposAndLanguages(1);
    ui.showProfile(user.profile);
    ui.showRepos(repos.repos.repos);
    searchRepo.className = "d-block justify-content-between";
  } else {
    alert("Please enter a username");
  }
});

Array.from(pageitems).forEach((pageitem) => {
  pageitem.addEventListener("click", async (e) => {
    const userText = searchUser.value;
    const github = new Github(userText);
    ui.showReposLoader();
    localStorage.setItem("current_page", e.target.id);
    github.setCurrentPage(e.target.id);
    pageitem.classList.add("active");
    Array.from(pageitems).forEach((pageitem) => {
      if (pageitem.id !== e.target.id) {
        pageitem.classList.remove("active");
      }
    });
    const repos = await github.combineReposAndLanguages();
    if (repos == null) {
      alert("Plz Enter a valid username");
      ui.hideReposLoader();
      return;
    }
    ui.showRepos(repos.repos.repos);
  });
});

pageitemnext.addEventListener("click", async (e) => {
  const userText = searchUser.value;
  const github = new Github(userText);
  ui.showReposLoader();
  const current_page = localStorage.getItem("current_page");
  if (current_page === null) {
    github.setCurrentPage(1);
    pageitems[0].classList.add("active");
    localStorage.setItem("current_page", 1);
  } else if (parseInt(current_page) + 1 > 9) {
    github.setCurrentPage(9);
    localStorage.setItem("current_page", 9);
  } else {
    github.setCurrentPage(parseInt(current_page) + 1);
    pageitems[parseInt(current_page)].classList.add("active");
    pageitems[parseInt(current_page) - 1].classList.remove("active");
    localStorage.setItem("current_page", parseInt(current_page) + 1);
  }
  const repos = await github.combineReposAndLanguages();
  if (repos == null) {
    alert("Plz Enter a valid username");
    ui.hideReposLoader();
    return;
  }
  ui.showRepos(repos.repos.repos);
});

pageitemprev.addEventListener("click", async (e) => {
  const userText = searchUser.value;
  const github = new Github(userText);
  ui.showReposLoader();
  const current_page = localStorage.getItem("current_page");
  if (current_page === null) {
    github.setCurrentPage(1);
    pageitems[0].classList.add("active");
    localStorage.setItem("current_page", 1);
  } else if (parseInt(current_page) - 1 < 1) {
    github.setCurrentPage(1);
    localStorage.setItem("current_page", 1);
  } else {
    github.setCurrentPage(parseInt(current_page) - 1);
    pageitems[parseInt(current_page) - 2].classList.add("active");
    pageitems[parseInt(current_page) - 1].classList.remove("active");
    localStorage.setItem("current_page", parseInt(current_page) - 1);
  }

  const repos = await github.combineReposAndLanguages();
  if (repos == null) {
    alert("Plz Enter a valid username");
    ui.hideReposLoader();
    return;
  }
  ui.showRepos(repos.repos.repos);
});
perpage.addEventListener("change", async (e) => {
  github.setPerPage(e.target.value);
  ui.showReposLoader();
  const repos = await github.combineReposAndLanguages(1);
  if (repos == null) {
    alert("Plz Enter a valid username");
    ui.hideReposLoader();
    return;
  }
  ui.showRepos(repos.repos.repos);
});

orderby.addEventListener("change", async (e) => {
  github.setOrderBy(e.target.value);
  ui.showReposLoader();
  const repos = await github.combineReposAndLanguages(1);
  if (repos == null) {
    alert("Plz Enter a valid username");
    ui.hideReposLoader();
    return;
  }
  ui.showRepos(repos.repos.repos);
});

sortby.addEventListener("change", async (e) => {
  github.setSortBy(e.target.value);
  ui.showReposLoader();
  const repos = await github.combineReposAndLanguages(1);
  if (repos == null) {
    alert("Plz Enter a valid username");
    ui.hideReposLoader();
    return;
  }
  ui.showRepos(repos.repos.repos);
});

searchReposForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const reponame = e.target.reponame.value.toLowerCase();
  if (reponame === "") {
    alert("Plz Enter a valid Query");
    return;
  }
  ui.showReposLoader();
  const filteredRepos = await github.search(reponame);
  if (filteredRepos.repos.items.length === 0) {
    ui.hideReposLoader();
    ui.showNoReposFound();
    return;
  }
  ui.showRepos(filteredRepos.repos.items);
});

window.onload = function () {
  localStorage.removeItem("current_page");
};
