
const GitHubApi = require('github')

const github = new GitHubApi({
  protocol: 'https',
  host: 'api.github.com',
  headers: {
    'user-agent': 'bot-intro-app'
  },
  followRedirects: false,
  timeout: 5000
})

module.exports = github
