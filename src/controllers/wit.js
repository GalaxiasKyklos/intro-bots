
const Wit = require('node-wit').Wit

class WitControler {
  constructor (token) {
    this.wit = new Wit({
      accessToken: token
    })
  }

  /**
  * Process the messages coming from the NLP processor and return with
  * the generic format
  *
  * @param  {string} message:         A message array coming from the NLP
  * @return Wit API response:         The messages with the generic format
  * */
  processMessage (message) {
    return this.wit.message(message, {})
  }

  /**
   * Process the wit response to a more useful entity map
   * @method getEntities
   * @param  {string}    message The message to be processed
   * @return {Promise<entities>} A promise that resolves to a map of entities
   */
  getEntities (message) {
    return this.processMessage(message)
      .then(witResponse => {
        const entities = witResponse.entities
        const flatEntities = {}

        for (const entity in entities) {
          if (Object.prototype.hasOwnProperty.call(entities, entity)) {
            flatEntities[entity] = entities[entity][0].value
          }
        }

        return flatEntities
      })
  }
}

const token = process.env.WIT_ACCESS_TOKEN
const controller = new WitControler(token)

module.exports = controller
