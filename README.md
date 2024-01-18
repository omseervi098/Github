# Github Profile using Github API
## Running on Local 
* Clone the Repository `git clone https://github.com/omseervi098/Github.git`
* Add a file named `config.js` in the Same Directory
* generate Personal Access Token from GitHub Developer Setting ( for accessing GitHub API with more rate limits) 
* `function gettoken() {
  return {PASTE_YOUR_TOKEN};
}`
* Add this fn to config.js
* now run using go live or clicking the index.html file

## Link Hosted Web App:
* Netlify [https://gitprof.netlify.app/]

## Features
* Seach Any User on GitHub [ name, blog page, Twitter, bio, image, follower, following, public repos]
* Server Side Pagination of Repos of Particular User with [name, languages, description]
* Filter for repo based on sort by [created_at,name,updated_at] and order by [older,newer]
* Search for Any Repo of a particular user
