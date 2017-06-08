
const requestPromise = require('request-promise')
const github = require('../controllers/github')

const isGreeting = entity => entity === 'greeting'
const isRepos = entity => entity === 'repos'
const isFollowers = entity => entity === 'followers'
const isStatus = entity => entity === 'status'
const hasTarget = entities => entities.hasOwnProperty('target')
const hasAdjective = entities => entities.hasOwnProperty('adjective')

const isUp = string => string === 'up'
const isDown = string => string === 'down'

const getAnswer = (ansUp, ansDown, ansNone) => {
  return isUp(answerType) ? ansUp
  : isDown(answerType) ? ansDown : ansNone
}

const getFollowersForUser = target => {
  return github.users.getFollowersForUser({
    username: target
  })
    .then(githubResponse => {
      const { data } = githubResponse
      const followers = data.map(follower => follower.login)
      const followersString = followers.join(', ')
      const response = `${followersString} follow ${target}`

      return response
    })
    .catch(error => {
      console.log(error)
      return 'Oops, something went wrong. :('
    })
}
const getReposForUser = target => {
  return github.repos.getForUser({
    username: target
  })
    .then(githubResponse => {
      const { data } = githubResponse
      const repos = data.map(repo => repo.name)
      const reposString = repos.join(', ')
      const response = `${target} has the following repos: ${reposString}`

      return response
    })
    .catch(error => {
      console.log(error)
      return 'Oops, something went wrong. :('
    })
}
const getServiceStatus = answerType => {
  return requestPromise({
    method: 'GET',
    uri: 'https://status.github.com/api/status.json',
    json: true
  })
    .then(status => {
      const current = status.status
      switch (current) {
        case 'good':
          return getAnswer(
            'Yes, sir! All good!',
            'Nope, everything is fine.',
            'All is good 👍🏼'
          )
        case 'minor':
          return getAnswer(
            'Kinda, it\'s having some minor issues.',
            'Most likely, it\'s having some minor issues.',
            'Github is suffering from minor issues. Sorry \'bout that.'
          )
        case 'major':
          return getAnswer(
            'Ooooh, no. It\'s suffering from biiiig issues.',
            'Sadly, yeah. Everything is on fire',
            'Everything in Github is on fire. Sorry. :('
          )
        default:
          return 'Ammm… something is wrong with the bot'
      }
    })
    .catch(error => {
      console.log(error)
      return 'Oops, something went wrong. :('
    })
}

const process = (entities, message) => {
  let response = ''
  const {
    senderId,
    text
  } = message

  const { intent } = entities
  if (isGreeting(intent)) {
    return new Promise((resolve, reject) => {
      resolve('Hey!')
    })
  } else if (isStatus(intent)) {
    if (hasAdjective(entities)) {

    } else {
      return getServiceStatus('none')
    }
  } else if (isRepos(intent) && hasTarget(entities)) {
    const { target } = entities

    return getReposForUser(target)
  } else if (isFollowers(intent) && hasTarget(entities)) {
    const { target } = entities

    return getFollowersForUser(target)
  }

  return new Promise((resolve, reject) => {
    reject('Something went wrong, I\'m so sorry')
  })

}

module.exports = {
  process
}
