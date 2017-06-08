
const GitHubApi = require('github')

const github = new GitHubApi({
    // optional
  debug: false,
  protocol: 'https',
  host: 'api.github.com', // should be api.github.com for GitHub
  headers: {
    'user-agent': 'bot-intro-app' // GitHub is happy with a unique user agent
  },
  followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
  timeout: 5000
})

module.exports = github
