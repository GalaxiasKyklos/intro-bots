
const requestPromise = require('request-promise')
const github = require('./github')

const isGreeting = entity => entity === 'greeting'
const isRepos = entity => entity === 'repos'
const isFollowers = entity => entity === 'followers'
const isStatus = entity => entity === 'status'
const hasTarget = entities => entities.hasOwnProperty('target')
const hasAdjective = entities => entities.hasOwnProperty('adjective')

const isUp = string => string === 'up'
const isDown = string => string === 'down'

const fallbackMessages = [
  'I\'m sorry, bro, I didn\'t understand you.',
  'How was that again?',
  'Speak sloooooow, pleaaaase.'
]

const greeting = () => {
  return new Promise((resolve, reject) => {
    resolve('Hi, user! 👋🏼')
  })
}

const speakSlow = () => {
  return new Promise((resolve, reject) => {
    const i = Math.floor(Math.random() * 3)
    const message = fallbackMessages[i]
    resolve(message)
  })
}

const getReposForUser = user => {
  return github.repos.getForUser({
    username: user
  })
    .then(githubResponse => {
      const data = githubResponse.data
      const repos = data.map(repo => repo.name)
      const reposString = repos.join(', ')
      const response = `${user} has the following repos: ${reposString}`

      return response
    })
    .catch(error => {
      console.log(error)
      return 'Oops, something brokes.'
    })
}

// Main function to process the message
const process = entities => {
  const intent = entities.intent

  if (isGreeting(intent)) {
    // Do greeting stuff
    return greeting()
  } else if (isRepos(intent) && hasTarget(entities)) {
    // Get the repos for the target
    const target = entities.target
    console.log(target);
    return getReposForUser(target)
  } else if (isFollowers(intent) && hasTarget(entities)) {
    // Get the follower for the target
  } else if (isStatus(intent)) {
    if (hasAdjective(entities)) {
      // Do some up or down
    } else {
      // General status
    }
  }

  // Do the fallback case
  return speakSlow()
}

module.exports = {
  process
}
