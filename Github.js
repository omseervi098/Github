class Github {
  username = "";
  token = "";
  per_page = 10;
  current_page = 1;
  sortby = "created";
  orderby = "asc";
  constructor() {
    this.token = "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";
  }
  async setUsername(username) {
    this.username = username;
  }
  async setSortBy(sortby) {
    this.sortby = sortby;
  }
  async setOrderBy(orderby) {
    this.orderby = orderby;
  }
  async setPerPage(per_page) {
    this.per_page = per_page;
  }
  async setCurrentPage(current_page) {
    this.current_page = current_page;
  }
  async getUser() {
    if (this.username === "") {
      return null;
    }
    try {
      const profileResponse = await fetch(
        `https://api.github.com/users/${this.username}`,
        {
          headers: {
            Authorization: `token ${this.token}`,
          },
        }
      );
      const profile = await profileResponse.json();
      return {
        profile,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getRepos() {
    if (this.username === "") {
      return null;
    }
    try {
      const url = `https://api.github.com/users/${this.username}/repos?per_page=${this.per_page}&page=${this.current_page}&sort=${this.sortby}&direction=${this.orderby}`;
      const repoResponse = await fetch(url, {
        headers: {
          Authorization: `token ${this.token}`,
        },
      });
      const repos = await repoResponse.json();
      return {
        repos,
      };
    } catch (err) {
      return null;
    }
  }

  async getLanguages(repo) {
    const languageResponse = await fetch(repo, {
      headers: {
        Authorization: `token ${this.token}`,
      },
    });
    const languages = await languageResponse.json();
    return {
      languages,
    };
  }
  async combineReposAndLanguages() {
    const repos = await this.getRepos();
    if (repos === null) {
      return null;
    }
    for (let repo of repos.repos) {
      const languages = await this.getLanguages(repo.languages_url);
      repo.languages = languages;
    }
    return {
      repos,
    };
  }
  async search(query) {
    if (this.query === "") {
      return null;
    }
    try {
      const url = `https://api.github.com/search/repositories?q=user:${this.username}+${query}&per_page=${this.per_page}&page=${this.current_page}&sort=${this.sortby}&order=${this.orderby}`;
      const repoResponse = await fetch(url, {
        headers: {
          Authorization: `token ${this.token}`,
        },
      });
      const repos = await repoResponse.json();
      for (let repo of repos.items) {
        const languages = await this.getLanguages(repo.languages_url);
        repo.languages = languages;
      }
      return {
        repos,
      };
    } catch (err) {
      return null;
    }
  }
}
