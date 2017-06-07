
const requestPromise = require('request-promise')

const isSubscribe = mode => mode === 'subscribe'
const isTokenValid = token => token === process.env.FB_VERIFY_TOKEN

const getWebhook = (req, res) => {
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']

  if (isSubscribe(mode) && isTokenValid(token)) {
    console.log('Validating Facebook webhook')
    res.status(200).send(challenge)
  } else {
    console.error('Failed validation. Make sure the validation tokens match.')
    res.sendStatus(403)
  }
}

const receivedMessage = event => {

}

const sendTextMessage = (recipientId, messageText) => {

}

const postWebhook = (req, res) => {

}

module.exports = {
  getWebhook,
  postWebhook
}
